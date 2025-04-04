"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const token_service_1 = require("../../auth/services/token.service");
const cards_service_1 = require("../../cards/services/cards.service");
const card_entity_1 = require("../../core/entities/card.entity");
const document_entity_1 = require("../../core/entities/document.entity");
const user_entity_1 = require("../../core/entities/user.entity");
const kyc_verification_status_enum_1 = require("../../core/enum/kyc-verification-status.enum");
const user_role_enum_1 = require("../../core/enum/user-role.enum");
const hash_util_1 = require("../../core/utils/hash.util");
const merchant_client_service_1 = require("../../integration/busybox/external-system-client/merchant-client.service");
const otp_repository_1 = require("../../notifications/repository/otp.repository");
const otp_flow_service_1 = require("../../notifications/services/otp-flow.service");
const wallet_queue_1 = require("../../wallet/services/wallet.queue");
const wallet_service_1 = require("../../wallet/services/wallet.service");
const typeorm_2 = require("typeorm");
const kyc_required_doc_types_constant_1 = require("../constants/kyc-required-doc-types.constant");
const user_documents_dto_1 = require("../dto/user-documents.dto");
const user_response_dto_1 = require("../dto/user-response.dto");
const user_mapper_1 = require("../mapper/user-mapper");
const updaload_file_service_1 = require("./updaload-file.service");
const recharge_client_service_1 = require("../../integration/a1topup/external-system-client/recharge/recharge-client.service");
const aadhar_verification_entity_1 = require("../../core/entities/aadhar-verification.entity");
const notification_bridge_1 = require("../../notifications/services/notification-bridge");
let UsersService = class UsersService {
    constructor(tokenService, configService, walletService, merchantClientService, cardService, _connection, uploadFileService, otpFlowService, otpRepository, rechargeClient, walletBridge, notificationBridge, userRepository, aadharResponseRepo, documentRepository) {
        this.tokenService = tokenService;
        this.configService = configService;
        this.walletService = walletService;
        this.merchantClientService = merchantClientService;
        this.cardService = cardService;
        this._connection = _connection;
        this.uploadFileService = uploadFileService;
        this.otpFlowService = otpFlowService;
        this.otpRepository = otpRepository;
        this.rechargeClient = rechargeClient;
        this.walletBridge = walletBridge;
        this.notificationBridge = notificationBridge;
        this.userRepository = userRepository;
        this.aadharResponseRepo = aadharResponseRepo;
        this.documentRepository = documentRepository;
        this.saltRounds = 10;
    }
    async registerUser(userRequestDto) {
        console.log(userRequestDto);
        const queryRunner = this._connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newUser = user_mapper_1.UserMapper.mapUserRequestDtoToEntity(userRequestDto);
            const userExists = await this.userRepository.findOne({
                where: {
                    phoneNumber: userRequestDto.phoneNumber,
                }
            });
            const referrer = await this.validateRefferelCode(userRequestDto.referrelCode, queryRunner);
            if (userExists) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                throw new common_1.ConflictException('User already exists');
            }
            const savedUser = this.userRepository.create(newUser);
            if (!savedUser) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                throw new common_1.BadRequestException('User cannot be created');
            }
            await queryRunner.manager.save(savedUser);
            const wallet = await this.walletService.createWallet({
                user: savedUser,
                walletAccountNo: await this.walletService.generateWalletAccountNo()
            }, queryRunner);
            const cardInfo = await this.merchantClientService.getCustomerStatus(savedUser.phoneNumber);
            const cardDetails = cardInfo.data.card_details;
            const cardDto = {
                user: savedUser,
                cardNumber: cardDetails.cardId,
                status: card_entity_1.CardStatus.InActive
            };
            const card = await this.cardService.createCardAndAssignKitNumberToUser(cardDto, queryRunner);
            if (!wallet || !card) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                throw new common_1.BadRequestException('Wallet creation failed');
            }
            await queryRunner.commitTransaction();
            await this.notificationBridge.add('newUser', savedUser);
            const userModel = { ...savedUser, card: card };
            if (referrer) {
                await this.walletBridge.add('referrel', {
                    referrer: referrer.id,
                    refree: savedUser.id
                });
            }
            return this.addProfileIconInUserResponse(savedUser, new user_response_dto_1.UserResponse(userModel));
        }
        catch (err) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                throw new common_1.InternalServerErrorException(err.message);
            }
            throw err;
        }
    }
    async validateRefferelCode(referrelCode, queryRunner) {
        let referrer = null;
        if (referrelCode) {
            referrer = await this.userRepository.findOneBy({ referralCode: referrelCode });
            if (!referrer) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                throw new common_1.BadRequestException('Invalid Referral code');
            }
        }
        return referrer;
    }
    async deleteUser(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.ForbiddenException('user does not have enough permissions');
        }
        user.isBlocked = true;
        await this.userRepository.save(user);
        return "Success";
    }
    async registerUserAndGenerateToken(userRequestDto) {
        const orgId = this.configService.get('BUSY_BOX_ORG_ID');
        const issueCardDto = user_mapper_1.UserMapper.mapUserRequestDtoToMerchantRegistrationDto(userRequestDto, orgId);
        const userResponse = await this.merchantClientService.issueCard(issueCardDto);
        if (userResponse.status === "SUCCESS") {
            userRequestDto.cardHolderId = userResponse.data.cardHolderId;
            userRequestDto.userSession = userResponse.sessionId;
            const user = await this.registerUser(userRequestDto);
            const tokenPayload = {
                userId: user.userid,
                phoneNumber: user.phoneNumber,
                role: user.userRole,
            };
            const tokens = await this.tokenService.generateTokens(tokenPayload);
            return {
                user,
                tokens,
            };
        }
        throw new common_1.InternalServerErrorException("Failed to issue card for the user");
    }
    async requestAadharOtp(aadharNumber) {
        const data = await this.rechargeClient.requestAadharOtp(aadharNumber);
        if (data.status === "SUCCESS") {
            return {
                message: "Success",
                sessionId: data.aadhaarData?.otpSessionId
            };
        }
        return {
            message: "Failure",
            sessionId: null
        };
    }
    async validateAadharOtp(requestBody) {
        const response = await this.rechargeClient.validateAadharOtp(requestBody.aadharNumber, requestBody.otp, requestBody.otpSessionId);
        if (response.status === "SUCCESS" && response.transId === "OTP_VERIFIED") {
            await this.aadharResponseRepo.save(this.aadharResponseRepo.create({
                aadharNumber: requestBody.aadharNumber,
                aadharResponse: response
            }));
            return "Success";
        }
        else {
            return "Failure";
        }
    }
    async registerAdminAndGenerateToken(userRequestDto) {
        userRequestDto.cardHolderId = `ADMIN_${(0, hash_util_1.generateRef)(12)}`;
        const user = await this.registerUser(userRequestDto);
        const tokenPayload = {
            userId: user.userid,
            phoneNumber: user.phoneNumber,
            role: user.userRole,
        };
        const tokens = await this.tokenService.generateTokens(tokenPayload);
        return {
            user,
            tokens,
        };
    }
    async updateUserProfile(userId, userRequestDto) {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['merchant', 'card', 'address', 'loans', 'documents', 'beneficiaries'] });
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const updatedUserEntity = user_mapper_1.UserMapper.mapUserUpdateRequestDtoToUserEntity(user, userRequestDto);
        await this.userRepository.save(updatedUserEntity);
        user.kycVerificationStatus = kyc_verification_status_enum_1.KycVerificationStatus[user.kycVerificationStatus];
        return user;
    }
    async checkPhoneNumberExists(phoneNumber) {
        if (!phoneNumber) {
            throw new common_1.BadRequestException('Invalid phone number');
        }
        const user = await this.userRepository.findOneBy({
            phoneNumber: phoneNumber
        });
        return {
            isUserExist: !!user,
            userName: `${user.firstName} ${user.lastName}`,
            phoneNumber: user.phoneNumber
        };
    }
    async getAllUsers(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        if (user.role !== user_role_enum_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('User does not have enough permissions');
        }
        const users = await this.userRepository.find({
            where: {
                role: (0, typeorm_2.Not)(user_role_enum_1.UserRole.ADMIN),
            },
        });
        return users.map(user => new user_response_dto_1.UserResponse(user));
    }
    async addProfileIconInUserResponse(userModel, userResponse) {
        if (userModel.profileIcon) {
            const fileInfo = await this.uploadFileService.getPresignedSignedUrl(userModel.profileIcon);
            userResponse.profileUrl = fileInfo.url;
        }
        if (userModel.staticQR) {
            const fileInfo = await this.uploadFileService.getPresignedSignedUrl(userModel.staticQR);
            userResponse.staticQRUrl = fileInfo.url;
        }
        return userResponse;
    }
    async setPin(userId, pin) {
        const hashedPin = await bcrypt.hash(pin, this.saltRounds);
        await this.userRepository.update(userId, { pin: hashedPin });
    }
    async verifyPin(userId, pin) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return bcrypt.compare(pin, user.pin);
    }
    async validateUserCardAssignment(userId, otp) {
        const user = await this.findUserById(userId);
        const response = await this.merchantClientService.verifyRegistrationOtp({
            otp: otp,
            mobile_number: user.phoneNumber,
            sessionId: user.userSession || "YES"
        });
        if (response.statusCode == "S0200") {
            const card = await this.cardService.activateUserCard(user.id);
            return card;
        }
        throw new common_1.InternalServerErrorException('Failed to validate OTP');
    }
    async updateUserKycStatus(userId, updateKycStatus) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        const isRequiredDocumentsUploaded = user.documents.length && user.documents
            .every((document) => ['AADHAR', 'AADHAR_BACK_SIDE', 'PAN'].includes(document.documentType));
        if (!isRequiredDocumentsUploaded) {
            throw new common_1.BadRequestException('AADHAR or PAN documents not uploaded');
        }
        const updatedStatus = kyc_verification_status_enum_1.KycVerificationStatus[updateKycStatus];
        user.kycVerificationStatus = updatedStatus;
        try {
            await this.userRepository.save(user);
            return 'User kyc status updated.';
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async handleKycEvent(cardHolderId, kycStatus) {
        const user = await this.userRepository.findOne({ where: { cardHolderId: cardHolderId } });
        const kycColumnStatus = kycStatus === 'COMPLETED' ? kyc_verification_status_enum_1.KycVerificationStatus.COMPLETED : kyc_verification_status_enum_1.KycVerificationStatus.REJECTED;
        user.kycVerificationStatus = kycColumnStatus;
        await this.userRepository.save(user);
    }
    async getUsersByKycStatus(kycStatus) {
        const kycStatusValue = kyc_verification_status_enum_1.KycVerificationStatus[kycStatus];
        const users = await this.userRepository.find({
            where: {
                kycVerificationStatus: kycStatusValue
            }
        });
        return users.map((user) => new user_response_dto_1.UserResponse(user));
    }
    async getUserStaticQR(userId) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            });
            if (!user || !user.staticQR) {
                return {
                    url: null
                };
            }
            return {
                url: (await this.uploadFileService.getPresignedSignedUrl(user.staticQR)).url
            };
        }
        catch {
            return {
                url: null
            };
        }
    }
    async getKycStatusOfUser(userId) {
        const user = await this.userRepository.findOneBy({
            id: userId
        });
        if (user) {
            return kyc_verification_status_enum_1.KycVerificationStatus[user.kycVerificationStatus].toString();
        }
        throw new common_1.ForbiddenException('user does not have enough permission');
    }
    findUserById(userId) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async sendVerificationCode(userId) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.otpFlowService.requestOtp(user.phoneNumber, user.email);
    }
    async verifyCodeAndUpdateUserPin(userId, otp, pin) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        try {
            await this.otpRepository.validateUserOtp(user.phoneNumber, otp);
            await this.setPin(userId, pin);
            return {
                message: "Pin Reset successfully!!!"
            };
        }
        catch {
            throw new common_1.BadRequestException('Failed to validate OTP');
        }
    }
    async updateUserKycDetails(userId, fileInfos) {
        const userInfo = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!userInfo) {
            throw new common_1.NotFoundException(`User not found`);
        }
        const queryRunner = this._connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const fileInfo of fileInfos) {
                const documentInfo = await queryRunner.manager.findOne(document_entity_1.UserDocument, {
                    where: { user: { id: userId }, documentType: fileInfo.docType },
                });
                await this.saveDocumentInfo(fileInfo, userInfo, documentInfo, queryRunner.manager);
            }
            const userUploadedDocs = await queryRunner.manager.find(document_entity_1.UserDocument, {
                where: { user: {
                        id: userId
                    } },
            });
            if (this.isKycVerificationDocumentsUploaded(fileInfos, userUploadedDocs)) {
                await queryRunner.manager.update(user_entity_1.User, {}, {
                    kycVerificationStatus: kyc_verification_status_enum_1.KycVerificationStatus.REQUESTED
                });
            }
            await queryRunner.commitTransaction();
            return true;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException(err.message);
            }
            else {
                throw err;
            }
        }
        finally {
            await queryRunner.release();
        }
    }
    isKycVerificationDocumentsUploaded(docs, uploadedDocs) {
        const uploadedDocsTypes = docs.map(doc => doc.docType.toString());
        const alreadyUploadedDocs = uploadedDocs?.map(doc => doc.documentType);
        const mergedDocs = Array.from(new Set([...uploadedDocsTypes, ...alreadyUploadedDocs]));
        return mergedDocs.every(doc => kyc_required_doc_types_constant_1.KycRequiredDocTypes.includes(doc));
    }
    async getUserDocuments(userId) {
        const documents = await this.documentRepository.find({ where: { user: { id: userId } } }) ?? [];
        for (const document of documents) {
            document.documentUrl = (await this.uploadFileService.getPresignedSignedUrl(document.documentUrl)).url;
        }
        return documents.reduce((acc, item) => {
            acc[item.documentType] = new user_documents_dto_1.UserDocumentResponseDto(item);
            return acc;
        }, {});
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId },
            relations: ['merchant', 'card', 'address', 'loans', 'documents', 'beneficiaries'] });
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        if (user.profileIcon) {
            const fileInfo = await this.uploadFileService.getPresignedSignedUrl(user.profileIcon);
            user.profileUrl = fileInfo.url;
        }
        if (user.staticQR) {
            const fileInfo = await this.uploadFileService.getPresignedSignedUrl(user.staticQR);
            user.staticQRUrl = fileInfo.url;
        }
        if (user.documents?.length) {
            for (const document of user.documents) {
                const fileInfo = await this.uploadFileService.getPresignedSignedUrl(document.documentUrl);
                document.documentUrl = fileInfo.url;
            }
        }
        user.kycVerificationStatus = kyc_verification_status_enum_1.KycVerificationStatus[user.kycVerificationStatus].toString();
        return user;
    }
    async saveDocumentInfo(fileInfo, userInfo, documentInfo, entityManager) {
        if (!entityManager) {
            entityManager = this.documentRepository.manager;
        }
        if (documentInfo) {
            documentInfo.description = fileInfo.description;
            documentInfo.documentUrl = fileInfo.fileKey;
            await entityManager.update(document_entity_1.UserDocument, { user: userInfo, documentType: documentInfo.documentType }, {
                description: fileInfo.description,
                documentUrl: fileInfo.fileKey
            });
        }
        else {
            documentInfo = this.documentRepository.create({
                description: fileInfo.description,
                documentUrl: fileInfo.fileKey,
                documentType: fileInfo.docType,
                user: userInfo
            });
            await entityManager.save(documentInfo);
        }
        return true;
    }
    async updateProfileIcon(userId, file) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const fileInfo = await this.uploadFileService.uploadSingleFile(file);
        user.profileIcon = fileInfo.key;
        await this.userRepository.save(user);
        return {
            message: 'Profile icon updated successfully!',
            fileUrl: fileInfo.url
        };
    }
    async updateStaticQR(userId, merchantId, file) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.BadRequestException('user not found');
        }
        const fileInfo = await this.uploadFileService.uploadSingleFile(file);
        user.staticQR = fileInfo.key;
        user.merchantPartnerId = merchantId;
        await this.userRepository.save(user);
        return {
            message: 'Static QR updated successfully!',
            fileUrl: fileInfo.url
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(12, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(13, (0, typeorm_1.InjectRepository)(aadhar_verification_entity_1.AadharResponse)),
    __param(14, (0, typeorm_1.InjectRepository)(document_entity_1.UserDocument)),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        config_1.ConfigService,
        wallet_service_1.WalletService,
        merchant_client_service_1.MerchantClientService,
        cards_service_1.CardsService,
        typeorm_2.DataSource,
        updaload_file_service_1.UploadFileService,
        otp_flow_service_1.OtpFlowService,
        otp_repository_1.OtpRepository,
        recharge_client_service_1.RechargeClientService,
        wallet_queue_1.WalletBridge,
        notification_bridge_1.NotificationBridge,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map