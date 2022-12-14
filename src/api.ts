import {
  ActionEnum,
  ActivityFeed,
  AddUserOrganizationDto,
  CheckPermissionDto,
  Comment,
  CommentDto,
  CreateDiscussionRequestDTO,
  CreateInlineCommentDto,
  CreateInvitationDto,
  CreateKysoAccessTokenDto,
  CreateOrganizationDto,
  Discussion,
  DraftReport,
  ElasticSearchIndex,
  EmailUserChangePasswordDTO,
  EntityEnum,
  FeedbackDto,
  File as KysoFile,
  FullTextSearchDTO,
  GithubEmail,
  GithubFileHash,
  InlineCommentDto,
  Invitation,
  InviteUserDto,
  JoinCodes,
  KysoSetting,
  KysoUserAccessToken,
  Login,
  LoginProviderEnum,
  NormalizedResponseDTO,
  Organization,
  OrganizationAuthOptions,
  OrganizationInfoDto,
  OrganizationMember,
  OrganizationOptions,
  PaginatedResponseDto,
  Report,
  ReportDTO,
  RepositoryProvider,
  SearchUser,
  SearchUserDto,
  SignUpDto,
  Tag,
  TagAssign,
  Team,
  TeamInfoDto,
  TeamMember,
  TokenPermissions,
  UpdateDiscussionRequestDTO,
  UpdateInlineCommentDto,
  UpdateJoinCodesDto,
  UpdateOrganizationDTO,
  UpdateOrganizationMembersDTO,
  UpdateReportRequestDTO,
  UpdateTeamMembersDTO,
  UpdateTeamRequest,
  UpdateUserRequestDTO,
  User,
  UserAccount,
  UserChangePasswordDTO,
  UserDTO,
  VerifyEmailRequestDTO,
} from '@kyso-io/kyso-model';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';
import { ReadStream } from 'fs';
import moment from 'moment';
import { AuthState } from '.';
import { verbose } from './helpers/logger-helper';

export class Api {
  private httpClient: AxiosInstance;
  private baseURL: string;
  private token: string | null | undefined;
  private organizationSlug: string | null | undefined;
  private teamSlug: string | null | undefined;

  public static fromAuthState(authState: AuthState): Api {
    return new Api(authState.token, authState.organization ? authState.organization : null, authState.team ? authState.team : null);
  }

  constructor(token?: string | null, organizationSlug?: string | null, teamSlug?: string | null) {
    this.httpClient = axios.create({
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    if (process.env.KYSO_API) {
      this.baseURL = process.env.KYSO_API;
    } else if (process.env.NEXT_PUBLIC_API_URL) {
      this.baseURL = process.env.NEXT_PUBLIC_API_URL;
    } else {
      this.baseURL = '/api/v1';
    }

    this.configure(this.baseURL, token, organizationSlug, teamSlug);
  }

  public configure(baseURL: string, token?: string | null, organizationSlug?: string | null, teamSlug?: string | null) {
    this.baseURL = baseURL;

    this.httpClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    this.token = token;
    this.organizationSlug = organizationSlug;
    this.teamSlug = teamSlug;

    this.httpClient.interceptors.request.use((config: any) => {
      verbose(`Calling [${config.method}] ${config.baseURL}${config.url}`);

      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      if (this.organizationSlug) {
        config.headers['x-kyso-organization'] = this.organizationSlug;
      }
      if (this.teamSlug) {
        config.headers['x-kyso-team'] = this.teamSlug;
      }
      return config;
    });
  }

  public getHttpClient(): AxiosInstance {
    return this.httpClient;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  public setOrganizationSlug(organizationSlug: string | null): void {
    this.organizationSlug = organizationSlug;
  }

  public setTeamSlug(teamSlug: string | null): void {
    this.teamSlug = teamSlug;
  }

  public setBaseUrl(baseUrl: string): void {
    this.baseURL = baseUrl;
  }

  // ACTIVITY FEED

  public async getUserActivityFeed(
    username: string,
    args: {
      start_datetime?: Date;
      end_datetime?: Date;
      user_id?: string;
      organization?: string;
      team?: string;
      entity?: EntityEnum;
      entityId?: string;
      action?: ActionEnum;
      sort?: string;
    },
  ): Promise<NormalizedResponseDTO<ActivityFeed[]>> {
    let url = `/activity-feed/user/${username}?`;
    if (args.start_datetime) {
      url += `&created_at>=${moment(args.start_datetime).format('YYYY-MM-DD')}`;
    }
    if (args.end_datetime) {
      url += `&created_at<${moment(args.end_datetime).add(1, 'days').format('YYYY-MM-DD')}`;
    }
    if (args.user_id) {
      url += `&user_id=${args.user_id}`;
    }
    if (args.organization) {
      url += `&organization=${args.organization}`;
    }
    if (args.team) {
      url += `&team=${args.team}`;
    }
    if (args.entity) {
      url += `&entity=${args.entity}`;
    }
    if (args.entityId) {
      url += `&entity_id=${args.entityId}`;
    }
    if (args.action) {
      url += `&action=${args.action}`;
    }
    if (args.sort) {
      url += `&sort=${args.sort}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ActivityFeed[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getOrganizationActivityFeed(
    organizationSlug: string,
    args: {
      start_datetime?: Date;
      end_datetime?: Date;
      user_id?: string;
      team?: string;
      entity?: EntityEnum;
      entityId?: string;
      action?: ActionEnum;
      sort?: string;
    },
  ): Promise<NormalizedResponseDTO<ActivityFeed[]>> {
    let url = `/activity-feed/organization/${organizationSlug}?`;
    if (args.start_datetime) {
      url += `&created_at>=${moment(args.start_datetime).format('YYYY-MM-DD')}`;
    }
    if (args.end_datetime) {
      url += `&created_at<${moment(args.end_datetime).add(1, 'days').format('YYYY-MM-DD')}`;
    }
    if (args.user_id) {
      url += `&user_id=${args.user_id}`;
    }
    if (args.team) {
      url += `&team=${args.team}`;
    }
    if (args.entity) {
      url += `&entity=${args.entity}`;
    }
    if (args.entityId) {
      url += `&entity_id=${args.entityId}`;
    }
    if (args.action) {
      url += `&action=${args.action}`;
    }
    if (args.sort) {
      url += `&sort=${args.sort}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ActivityFeed[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getTeamActivityFeed(
    organizationSlug: string,
    teamSlug: string,
    args: {
      start_datetime?: Date;
      end_datetime?: Date;
      user_id?: string;
      entity?: EntityEnum;
      entityId?: string;
      action?: ActionEnum;
      sort?: string;
    },
  ): Promise<NormalizedResponseDTO<ActivityFeed[]>> {
    let url = `/activity-feed/organization/${organizationSlug}/team/${teamSlug}?`;
    if (args.start_datetime) {
      url += `&created_at>=${moment(args.start_datetime).format('YYYY-MM-DD')}`;
    }
    if (args.end_datetime) {
      url += `&created_at<${moment(args.end_datetime).add(1, 'days').format('YYYY-MM-DD')}`;
    }
    if (args.user_id) {
      url += `&user_id=${args.user_id}`;
    }
    if (args.entity) {
      url += `&entity=${args.entity}`;
    }
    if (args.entityId) {
      url += `&entity_id=${args.entityId}`;
    }
    if (args.action) {
      url += `&action=${args.action}`;
    }
    if (args.sort) {
      url += `&sort=${args.sort}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ActivityFeed[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // AUTH

  public async login(login: Login): Promise<NormalizedResponseDTO<string>> {
    const url = '/auth/login';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await this.httpClient.post(url, login);
    return axiosResponse.data;
  }

  public async logout(): Promise<void> {
    const url = '/auth/logout';
    await this.httpClient.post(url);
  }

  public async signup(signUpDto: SignUpDto): Promise<NormalizedResponseDTO<User>> {
    const url = '/auth/sign-up';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await this.httpClient.post(url, signUpDto);
    return axiosResponse.data;
  }

  public async refreshToken(): Promise<NormalizedResponseDTO<string>> {
    const url = '/auth/refresh-token';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async getOrganizationAuthOptions(organizationSlug: string): Promise<NormalizedResponseDTO<OrganizationAuthOptions>> {
    const url = `/auth/organization/${organizationSlug}/options`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationAuthOptions>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserPermissions(username: string): Promise<NormalizedResponseDTO<TokenPermissions>> {
    const url = `/auth/user/${username}/permissions`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TokenPermissions>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async checkPermission(checkPermissionDto: CheckPermissionDto): Promise<NormalizedResponseDTO<boolean>> {
    const url = '/auth/check-permission';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, checkPermissionDto);
    return axiosResponse.data;
  }

  public async getPublicPermissions(): Promise<NormalizedResponseDTO<TokenPermissions>> {
    const url = '/auth/public-permissions';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TokenPermissions>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getApiVersion(): Promise<string> {
    const url = '/auth/version';
    const axiosResponse: AxiosResponse<string> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getDbVersion(): Promise<string> {
    const url = '/auth/db';
    const axiosResponse: AxiosResponse<string> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async verifyEmail(verifyEmailRequestDto: VerifyEmailRequestDTO): Promise<NormalizedResponseDTO<string>> {
    const url = '/auth/verify-email';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await this.httpClient.post(url, verifyEmailRequestDto);
    return axiosResponse.data;
  }

  public async sendVerificationEmail(): Promise<NormalizedResponseDTO<boolean>> {
    const url = '/auth/send-verification-email';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async isUsernameAvailable(username: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/auth/username-available/${username}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // COMMENTS

  public async getReportComments(reportId: string, sort?: string): Promise<NormalizedResponseDTO<Comment[]>> {
    let url = `/reports/${reportId}/comments`;
    if (sort) {
      url += `?sort=${sort}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getDiscussionComments(reportId: string, sort?: string): Promise<NormalizedResponseDTO<Comment[]>> {
    let url = `/reports/${reportId}/discussion/comments`;
    if (sort) {
      url += `?sort=${sort}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getComment(commentId: string): Promise<NormalizedResponseDTO<Comment>> {
    const url = `/comments/${commentId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createComment(comment: CommentDto): Promise<NormalizedResponseDTO<Comment>> {
    const url = '/comments';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await this.httpClient.post(url, comment);
    return axiosResponse.data;
  }

  public async updateComment(commentId: string, comment: CommentDto): Promise<NormalizedResponseDTO<Comment>> {
    const url = `/comments/${commentId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await this.httpClient.patch(url, comment);
    return axiosResponse.data;
  }

  public async deleteComment(commentId: string): Promise<NormalizedResponseDTO<Comment>> {
    const url = `/comments/${commentId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  // DISCUSSIONS

  public async getDiscussions(args: { teamId?: string; userId?: string; page: number; per_page: number; sort?: string; search?: string }): Promise<NormalizedResponseDTO<Discussion[]>> {
    let url = '/discussions?';
    if (args.teamId) {
      url += `&team_id=${args.teamId}`;
    }
    if (args.userId) {
      url += `&user_id=${args.userId}`;
    }
    if (args.page) {
      url += `&page=${args.page}`;
    }
    if (args.per_page) {
      url += `&per_page=${args.per_page}`;
    }
    if (args.sort) {
      url += `&sort=${args.sort}`;
    }
    if (args.search && args.search.length > 0) {
      url += `&search=${args.search}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getDiscussion(discussionId: string): Promise<NormalizedResponseDTO<Discussion>> {
    const url = `/discussions/${discussionId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createDiscussion(createDiscussionRequestDTO: CreateDiscussionRequestDTO): Promise<NormalizedResponseDTO<Discussion>> {
    const url = '/discussions';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await this.httpClient.post(url, createDiscussionRequestDTO);
    return axiosResponse.data;
  }

  public async updateDiscussion(discussionId: string, updateDiscussionRequestDTO: UpdateDiscussionRequestDTO): Promise<NormalizedResponseDTO<Discussion>> {
    const url = `/discussions/${discussionId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await this.httpClient.patch(url, updateDiscussionRequestDTO);
    return axiosResponse.data;
  }

  public async deleteDiscussion(discussionId: string): Promise<NormalizedResponseDTO<Discussion>> {
    const url = `/discussions/${discussionId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  // FEEDBACK

  public async createFeedback(feedbackDto: FeedbackDto): Promise<NormalizedResponseDTO<boolean>> {
    const url = '/feedback';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, feedbackDto);
    return axiosResponse.data;
  }

  // FULL TEXT SEARCH

  public async fullTextSearch(args: {
    type: ElasticSearchIndex;
    terms: string;
    page: number;
    perPage?: number;
    filterOrgs?: string[];
    filterTeams?: string[];
    filterTags?: string[];
    filterPeople?: string[];
  }): Promise<NormalizedResponseDTO<FullTextSearchDTO>> {
    let url = `/search?type=${args.type}&terms=${args.terms}&page=${args.page}`;
    if (args.perPage) {
      url += `&perPage=${args.perPage}`;
    }
    if (args.filterOrgs && args.filterOrgs.length > 0) {
      url += `&filter.orgs=${args.filterOrgs.join(',')}`;
    }
    if (args.filterTeams && args.filterTeams.length > 0) {
      url += `&filter.teams=${args.filterTeams.join(',')}`;
    }
    if (args.filterTags && args.filterTags.length > 0) {
      url += `&filter.tags=${args.filterTags.join(',')}`;
    }
    if (args.filterPeople && args.filterPeople.length > 0) {
      url += `&filter.people=${args.filterPeople.join(',')}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<FullTextSearchDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // INLINE COMMENTS

  public async getInlineComments(reportId: string): Promise<NormalizedResponseDTO<InlineCommentDto[]>> {
    const url = `/inline-comments/${reportId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<InlineCommentDto[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createInlineComment(createInlineCommentDto: CreateInlineCommentDto): Promise<NormalizedResponseDTO<InlineCommentDto>> {
    const url = '/inline-comments';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<InlineCommentDto>> = await this.httpClient.post(url, createInlineCommentDto);
    return axiosResponse.data;
  }

  public async updateInlineComment(inlineCommentId: string, updateInlineCommentDto: UpdateInlineCommentDto): Promise<NormalizedResponseDTO<InlineCommentDto>> {
    const url = `/inline-comments/${inlineCommentId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<InlineCommentDto>> = await this.httpClient.patch(url, updateInlineCommentDto);
    return axiosResponse.data;
  }

  public async deleteInlineComment(inlineCommentId: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/inline-comments/${inlineCommentId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  // INVITATIONS

  public async getInvitations(args: { filter?: object; sort?: string; page?: number; per_page?: number }): Promise<NormalizedResponseDTO<Invitation[]>> {
    const qs = new URLSearchParams({
      page: (args?.page || 1).toString(),
      per_page: (args?.per_page || 20).toString(),
      sort: args?.sort && args.sort.length > 0 ? args.sort : '-created_at',
      ...args?.filter,
    });
    const url = `/invitations?${qs.toString()}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getInvitation(invidationId: string): Promise<NormalizedResponseDTO<Invitation>> {
    const url = `/invitations/${invidationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createInvitation(createInvitationDto: CreateInvitationDto): Promise<NormalizedResponseDTO<Invitation>> {
    const url = '/invitations';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await this.httpClient.post(url, createInvitationDto);
    return axiosResponse.data;
  }

  public async acceptInvitation(invitationId: string): Promise<NormalizedResponseDTO<Invitation>> {
    const url = `/invitations/accept-invitation/${invitationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async rejectInvitation(invitationId: string): Promise<NormalizedResponseDTO<Invitation>> {
    const url = `/invitations/reject-invitation/${invitationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async deleteInvitation(invitationId: string): Promise<NormalizedResponseDTO<Invitation>> {
    const url = `/invitations/${invitationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  // ORGANIZATIONS

  public async getOrganizations(args: { filter?: object; sort?: string; page?: number; per_page?: number }): Promise<NormalizedResponseDTO<Organization[]>> {
    const qs = new URLSearchParams({
      page: (args?.page || 1).toString(),
      per_page: (args?.per_page || 20).toString(),
      sort: args?.sort && args.sort.length > 0 ? args.sort : '-created_at',
      ...args?.filter,
    });
    const url = `/organizations?${qs.toString()}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getOrganization(organizationId: string): Promise<NormalizedResponseDTO<Organization>> {
    const url = `/organizations/${organizationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getOrganizationBySlug(organizationSlug: string): Promise<NormalizedResponseDTO<Organization>> {
    const url = `/organizations/slug/${organizationSlug}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async deleteOrganization(organizationId: string): Promise<NormalizedResponseDTO<Organization>> {
    const url = `/organizations/${organizationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async updateOrganization(organizationId: string, updateOrganizationDto: UpdateOrganizationDTO): Promise<NormalizedResponseDTO<Organization>> {
    const url = `/organizations/${organizationId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.patch(url, updateOrganizationDto);
    return axiosResponse.data;
  }

  public async updateOrganizationOptions(organizationId: string, organizationOptions: OrganizationOptions): Promise<NormalizedResponseDTO<Organization>> {
    const url = `/organizations/${organizationId}/options`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.patch(url, organizationOptions);
    return axiosResponse.data;
  }

  public async getOrganizationMembers(organizationId: string): Promise<NormalizedResponseDTO<OrganizationMember[]>> {
    const url = `/organizations/${organizationId}/members`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async exportOrganizationMembers(organizationId: string): Promise<Buffer> {
    const url = `/organizations/${organizationId}/members/export`;
    const axiosResponse: AxiosResponse<Buffer> = await this.httpClient.get(url, { responseType: 'arraybuffer' });
    return axiosResponse.data;
  }

  public async inviteNewUser(inviteUserDto: InviteUserDto): Promise<NormalizedResponseDTO<{ organizationMembers: OrganizationMember[]; teamMembers: TeamMember[] }>> {
    const url = '/organizations/invitation';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<{ organizationMembers: OrganizationMember[]; teamMembers: TeamMember[] }>> = await this.httpClient.post(url, inviteUserDto);
    return axiosResponse.data;
  }

  public async createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<NormalizedResponseDTO<Organization>> {
    const url = '/organizations';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.post(url, createOrganizationDto);
    return axiosResponse.data;
  }

  public async addUserToOrganization(addUserOrganizationDto: AddUserOrganizationDto): Promise<NormalizedResponseDTO<OrganizationMember[]>> {
    const url = '/organizations/members';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await this.httpClient.post(url, addUserOrganizationDto);
    return axiosResponse.data;
  }

  public async joinUserToOrganization(organizationSlug: string, invitationCode: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/organizations/${organizationSlug}/join/${invitationCode}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async removeUserFromOrganization(organizationId: string, userId: string): Promise<NormalizedResponseDTO<OrganizationMember[]>> {
    const url = `/organizations/${organizationId}/members/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async updateOrganizationMemberRoles(organizationId: string, updateOrganizationMembersDTO: UpdateOrganizationMembersDTO): Promise<NormalizedResponseDTO<OrganizationMember[]>> {
    const url = `/organizations/${organizationId}/members-roles`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await this.httpClient.post(url, updateOrganizationMembersDTO);
    return axiosResponse.data;
  }

  public async deleteUserRoleOrganization(organizationId: string, userId: string, role: string): Promise<NormalizedResponseDTO<OrganizationMember[]>> {
    const url = `/organizations/${organizationId}/members/${userId}/${role}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async updateOrganizationImage(organizationId: string, file: File): Promise<NormalizedResponseDTO<Organization>> {
    const url = `/organizations/${organizationId}/profile-picture`;
    const formData = new FormData();
    formData.append('file', file);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.post(url, formData);
    return axiosResponse.data;
  }

  public async uploadOrganizationImage(organizationId: string, readStream: ReadStream): Promise<NormalizedResponseDTO<Organization>> {
    const formData = new FormData();
    formData.append('file', readStream);
    const url = `/organizations/${organizationId}/profile-picture`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await this.httpClient.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return axiosResponse.data;
  }

  public async getOrganizationsInfo(organizationId?: string): Promise<NormalizedResponseDTO<OrganizationInfoDto[]>> {
    let url = `/organizations/info`;
    if (organizationId) {
      url += `?organizationId=${organizationId}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationInfoDto[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getOrganizationReports(organizationSlug: string, page: number, limit?: number, sort?: string): Promise<NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>>> {
    const url = `/organizations/${organizationSlug}/reports?page=${page}&limit=${limit}&sort=${sort}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createJoinCodes(organizationId: string, updateJoinCodesDto: UpdateJoinCodesDto): Promise<NormalizedResponseDTO<JoinCodes>> {
    const url = `/organizations/${organizationId}/join-codes`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<JoinCodes>> = await this.httpClient.post(url, updateJoinCodesDto);
    return axiosResponse.data;
  }

  public async updateJoinCodes(organizationId: string, updateJoinCodesDto: UpdateJoinCodesDto): Promise<NormalizedResponseDTO<JoinCodes>> {
    const url = `/organizations/${organizationId}/join-codes`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<JoinCodes>> = await this.httpClient.patch(url, updateJoinCodesDto);
    return axiosResponse.data;
  }

  // REPORTS

  public async getReportById(reportId: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getReportByTeamIdAndSlug(teamId: string, reportSlug: string, version?: number): Promise<NormalizedResponseDTO<ReportDTO>> {
    let url = `/reports/${teamId}/${reportSlug}`;
    if (version) {
      url += `?version=${version}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getReports(args: { filter?: object; sort?: string; page?: number; per_page?: number }): Promise<NormalizedResponseDTO<ReportDTO[]>> {
    const qs = new URLSearchParams({
      page: (args?.page || 1).toString(),
      per_page: (args?.per_page || 20).toString(),
      sort: args?.sort && args.sort.length > 0 ? args.sort : '-created_at',
      ...args?.filter,
    });
    const url = `/reports?${qs.toString()}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getPaginatedReports(query: string): Promise<NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>>> {
    const url = `/reports/paginated?${query}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserReports(userId: string, query: string): Promise<NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>>> {
    const url = `/reports/user/${userId}?${query}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<PaginatedResponseDto<ReportDTO>>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getReportByReportNameAndTeamName(reportSlug: string, teamSlug: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportSlug}/${teamSlug}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async updateReport(reportId: string, updateReportRequestDto: UpdateReportRequestDTO): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.patch(url, updateReportRequestDto);
    return axiosResponse.data;
  }

  public async getReportFileTree(args: { reportId: string; filePath: string; version?: number }): Promise<NormalizedResponseDTO<GithubFileHash | GithubFileHash[]>> {
    let url = `/reports/${args.reportId}/tree?path=${args.filePath}`;
    if (args.version) {
      url = `${url}&version=${args.version}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash | GithubFileHash[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async deleteReport(reportId: string): Promise<NormalizedResponseDTO<Report>> {
    const url = `/reports/${reportId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async getReportFileContent(fileId: string, config?: AxiosRequestConfig): Promise<Buffer> {
    const url = `/reports/file-content/${fileId}`;
    const axiosResponse: AxiosResponse<Buffer> = await this.httpClient.get(url, config);
    return axiosResponse.data;
  }

  public async getReportFile(fileId: string): Promise<NormalizedResponseDTO<KysoFile>> {
    const url = `/reports/file/${fileId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoFile>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async toggleUserPinReport(reportId: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}/user-pin`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async toggleGlobalPinReport(reportId: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}/pin`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async toggleUserStarReport(reportId: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}/user-star`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async createKysoReport(formData: FormData): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/kyso`;
    verbose(`Calling POST ${url} with formData length ${formData.getLengthSync()}`);
    verbose(`FormData info`);
    verbose(JSON.stringify(formData));
    verbose(`FormData headers`);
    verbose(JSON.stringify(formData.getHeaders()));

    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        'content-length': formData.getLengthSync().toString(),
      },
    });
    return axiosResponse.data;
  }

  public async updateKysoReport(id: string, formData: FormData): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/kyso/${id}`;
    verbose(`Calling POST ${url} with formData length ${formData.getLengthSync()}`);
    verbose(`FormData info`);
    verbose(JSON.stringify(formData));
    verbose(`FormData headers`);
    verbose(JSON.stringify(formData.getHeaders()));

    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.put(url, formData, {
      headers: {
        ...formData.getHeaders(),
        'content-length': formData.getLengthSync().toString(),
      },
    });
    return axiosResponse.data;
  }

  public async createUiReport(formData: FormData): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/ui`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return axiosResponse.data;
  }

  public async updateUiReport(id: string, formData: FormData): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/kyso/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.put(url, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return axiosResponse.data;
  }

  public async updateMainFileReport(reportId: string, formData: FormData): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/ui/main-file${reportId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.put(url, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return axiosResponse.data;
  }

  public async importGithubRepository(repositoryName: string, branch: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    let url = `/reports/github/${repositoryName}`;
    if (branch) {
      url = `${url}?branch=${branch}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async importBitbucketRepository(repositoryName: string, branch: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    let url = `/reports/bitbucket/${repositoryName}`;
    if (branch) {
      url = `${url}?branch=${branch}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async importGitlabRepository(repositoryName: number | string, branch: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    let url = `/reports/gitlab/${repositoryName}`;
    if (branch) {
      url = `${url}?branch=${branch}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async pullReport(reportSlug: string, teamSlug: string, version?: number): Promise<Buffer> {
    let url = `/reports/${reportSlug}/${teamSlug}/pull`;
    if (version) {
      url = `${url}?version=${version}`;
    }
    const axiosResponse: AxiosResponse<Buffer> = await this.httpClient.get(url, { responseType: 'arraybuffer' });
    return axiosResponse.data;
  }

  public async downloadReport(reportId: string): Promise<Buffer> {
    const url = `/reports/${reportId}/download`;
    const axiosResponse: AxiosResponse<Buffer> = await this.httpClient.get(url, { responseType: 'arraybuffer' });
    return axiosResponse.data;
  }

  public async updateReportImage(reportId: string, file: File): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}/preview-picture`;
    const formData = new FormData();
    formData.append('file', file);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.post(url, formData, {
      headers: {
        //...formData.getHeaders(),
        'content-type': 'multipart/form-data',
      },
    });
    return axiosResponse.data;
  }

  public async deleteReportImage(reportId: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/${reportId}/preview-picture`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async getReportFiles(reportId: string, version?: number): Promise<NormalizedResponseDTO<KysoFile[]>> {
    let url = `/reports/${reportId}/files`;
    if (version && version > 0) {
      url = `${url}?version=${version}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoFile[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getReportVersions(reportId: string, sort: string): Promise<NormalizedResponseDTO<{ version: number; created_at: Date; num_files: number }[]>> {
    const qs = new URLSearchParams({
      sort: sort && sort.length > 0 ? sort : '-created_at',
    });
    const url = `/reports/${reportId}/versions?${qs.toString()}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<{ version: number; created_at: Date; num_files: number }[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getEmbeddedReport(organizationSlug: string, teamSlug: string, reportSlug: string): Promise<NormalizedResponseDTO<ReportDTO>> {
    const url = `/reports/embedded/${organizationSlug}/${teamSlug}/${reportSlug}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async reportExists(teamId: string, reportSlug: string): Promise<boolean> {
    const url = `/reports/${teamId}/${reportSlug}/exists`;
    const axiosResponse: AxiosResponse<boolean> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // DRAFTS

  public async createUiDraftReport(draft: DraftReport): Promise<NormalizedResponseDTO<DraftReport>> {
    const url = `/reports/ui/draft`;
    verbose(`Calling POST ${url} with...`);
    verbose(draft);

    const axiosResponse: AxiosResponse<NormalizedResponseDTO<DraftReport>> = await this.httpClient.post(url, draft);

    return axiosResponse.data;
  }

  // REPOSITORIES

  public async getRepositories(args: { provider: RepositoryProvider; page: number; per_page: number; query?: string }): Promise<NormalizedResponseDTO<any[]>> {
    let url = `/repos/${args.provider}?page=${args.page}&per_page=${args.per_page}`;
    if (args?.query && args.query.length > 0) {
      url += `&filter=${args.query}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserRepositories(provider: RepositoryProvider): Promise<NormalizedResponseDTO<any[]>> {
    const url = `/repos/${provider}/user`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getRepository(provider: RepositoryProvider, repositoryName: string): Promise<NormalizedResponseDTO<any>> {
    const url = `/repos/${provider}/${repositoryName}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getRepositoryTree(provider: RepositoryProvider, repositoryName: string, branch: string): Promise<NormalizedResponseDTO<GithubFileHash[]>> {
    const url = `/repos/${provider}/${repositoryName}/${branch}/tree`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserFromRepositoryProviderGivenAccessToken(provider: RepositoryProvider, accessToken: string): Promise<NormalizedResponseDTO<any>> {
    const url = `/repos/${provider}/user/${accessToken}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserEmailsFromRepositoryProviderGivenAccessToken(provider: string, accessToken: string): Promise<NormalizedResponseDTO<GithubEmail[]>> {
    const url = `/repos/${provider}/user/emails/${accessToken}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubEmail[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // SETTINGS

  public async getSettingValue(key: string): Promise<NormalizedResponseDTO<string>> {
    const url = `/kyso-settings/${key}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getPublicSettings(): Promise<NormalizedResponseDTO<KysoSetting[]>> {
    const url = `/kyso-settings/public`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoSetting[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // TAGS

  public async getTags(args: { filter?: object; sort?: string; page?: number; per_page?: number }): Promise<NormalizedResponseDTO<Tag[]>> {
    const qs = new URLSearchParams({
      page: (args?.page || 1).toString(),
      per_page: (args?.per_page || 20).toString(),
      sort: args?.sort && args.sort.length > 0 ? args.sort : '-created_at',
      ...args?.filter,
    });
    const url = `/tags?${qs.toString()}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createTag(tag: Tag): Promise<NormalizedResponseDTO<Tag>> {
    const url = `/tags`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await this.httpClient.post(url, tag);
    return axiosResponse.data;
  }

  public async getTag(tagId: string): Promise<NormalizedResponseDTO<Tag>> {
    const url = `/tags/${tagId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async tagExists(name: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/tags/check/${name}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async updateTag(tagId: string, tag: Tag): Promise<NormalizedResponseDTO<Tag>> {
    const url = `/tags/${tagId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await this.httpClient.patch(url, tag);
    return axiosResponse.data;
  }

  public async deleteTag(tagId: string): Promise<NormalizedResponseDTO<Tag>> {
    const url = `/tags/${tagId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async assignTagToEntity(tagId: string, entityId: string, entityEnum: EntityEnum): Promise<NormalizedResponseDTO<TagAssign>> {
    const url = `/tags/${tagId}/assign/${entityId}/${entityEnum}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TagAssign>> = await this.httpClient.post(url);
    return axiosResponse.data;
  }

  public async unassignTagFromEntity(tagId: string, entityId: string): Promise<NormalizedResponseDTO<TagAssign>> {
    const url = `/tags/${tagId}/unassign/${entityId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TagAssign>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  // TEAMS

  public async getTeams(args: { filter?: object; sort?: string; page?: number; per_page?: number }): Promise<NormalizedResponseDTO<Team[]>> {
    const qs = new URLSearchParams({
      page: (args?.page || 1).toString(),
      per_page: (args?.per_page || 20).toString(),
      sort: args?.sort && args.sort.length > 0 ? args.sort : '-created_at',
      ...args?.filter,
    });
    const url = `/teams?${qs.toString()}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getTeam(teamId: string): Promise<NormalizedResponseDTO<Team>> {
    const url = `/teams/${teamId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getTeamBySlug(organizationId: string, teamSlug: string): Promise<NormalizedResponseDTO<Team>> {
    const url = `/teams/${organizationId}/${teamSlug}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createTeam(team: Team): Promise<NormalizedResponseDTO<Team>> {
    const url = '/teams';
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.post(url, team);
    return axiosResponse.data;
  }

  public async deleteTeam(teamId: string): Promise<NormalizedResponseDTO<Team>> {
    const url = `/teams/${teamId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async getTeamMembers(teamId: string): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/members`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async exportTeamMembers(teamId: string): Promise<Buffer> {
    const url = `/teams/${teamId}/members/export`;
    const axiosResponse: AxiosResponse<Buffer> = await this.httpClient.get(url, { responseType: 'arraybuffer' });
    return axiosResponse.data;
  }

  public async getTeamAuthors(teamId: string): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/authors`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getTeamAssignees(teamId: string): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/assignees`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async userBelongsToTeam(teamId: string, userId: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/teams/${teamId}/members/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async addUserToTeam(teamId: string, userId: string): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/members/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async deleteUserFromTeam(teamId: string, userId: string): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/members/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async updateTeam(teamId: string, updateTeamRequest: UpdateTeamRequest): Promise<NormalizedResponseDTO<Team>> {
    const url = `/teams/${teamId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.patch(url, updateTeamRequest);
    return axiosResponse.data;
  }

  public async teamNameIsAvailable(organizationId: string, teamSlug: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/teams/check-name/${organizationId}/${teamSlug}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getReportsOfTeam(teamId: string): Promise<NormalizedResponseDTO<Report[]>> {
    const url = `/teams/${teamId}/reports`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async updateTeamMemberRoles(teamId: string, updateTeamMembersDTO: UpdateTeamMembersDTO): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/members-roles`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.patch(url, updateTeamMembersDTO);
    return axiosResponse.data;
  }

  public async deleteTeamMembersRole(teamId: string, userId: string, role: string): Promise<NormalizedResponseDTO<TeamMember[]>> {
    const url = `/teams/${teamId}/members-roles/${userId}/${role}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async updateTeamImage(teamId: string, file: File): Promise<NormalizedResponseDTO<Team>> {
    const url = `/teams/${teamId}/profile-picture`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.post(url, file);
    return axiosResponse.data;
  }

  public async deleteTeamImage(teamId: string): Promise<NormalizedResponseDTO<Team>> {
    const url = `/teams/${teamId}/profile-picture`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async uploadTeamMarkdownImage(teamId: string, file: File): Promise<NormalizedResponseDTO<string>> {
    const url = `/teams/${teamId}/upload-markdown-image`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await this.httpClient.post(url, file);
    return axiosResponse.data;
  }

  public async getTeamsInfo(teamId?: string): Promise<NormalizedResponseDTO<TeamInfoDto[]>> {
    let url = `/teams/info`;
    if (teamId) {
      url = `${url}?teamId=${teamId}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamInfoDto[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  // USERS

  public async getUsers(args: { userIds: string[]; page: number; per_page: number; sort: string; search?: string }): Promise<NormalizedResponseDTO<UserDTO[]>> {
    if (!args.page) {
      args.page = 1;
    }
    if (!args.per_page) {
      args.per_page = 20;
    }
    if (!args.sort) {
      args.sort = 'created_at';
    }
    let userIdsQueryString = '';
    if (args.userIds && args.userIds.length > 0) {
      userIdsQueryString = args.userIds.map((x) => `userId=${x}`).reduce((prev, last) => prev + '&' + last);
    }
    let url = `/users?page=${args.page}&per_page=${args.per_page}&sort=${args.sort}${userIdsQueryString}`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUser(userId: string): Promise<NormalizedResponseDTO<UserDTO>> {
    const url = `/users/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserProfileByUsername(username: string): Promise<NormalizedResponseDTO<UserDTO>> {
    const url = `/users/${username}/profile`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getUserProfileById(userId: string): Promise<NormalizedResponseDTO<UserDTO>> {
    const url = `/users/${userId}/public-data`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async updateUser(userId: string, updateUserRequestDto: UpdateUserRequestDTO): Promise<NormalizedResponseDTO<UserDTO>> {
    const url = `/users/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.patch(url, updateUserRequestDto);
    return axiosResponse.data;
  }

  public async deleteUser(userId: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/users/${userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async addUserAccount(userAccount: UserAccount): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/users/accounts`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, userAccount);
    return axiosResponse.data;
  }

  public async removeUserAccount(provider: LoginProviderEnum, accountId: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/users/accounts/${provider}/${accountId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async updateUserProfileImage(userId: string, file: File): Promise<NormalizedResponseDTO<UserDTO>> {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    const url = `/users/profile-picture`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.post(url, formData);
    return axiosResponse.data;
  }

  public async uploadUserProfileImage(userId: string, readStream: ReadStream): Promise<NormalizedResponseDTO<boolean>> {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', readStream);
    const url = `/users/profile-picture`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return axiosResponse.data;
  }

  public async updateUserBackgroundImage(userId: string, file: File): Promise<NormalizedResponseDTO<UserDTO>> {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    const url = `/users/background-image`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.post(url, formData);
    return axiosResponse.data;
  }

  public async uploadUserBackgroundImage(userId: string, readStream: ReadStream): Promise<NormalizedResponseDTO<boolean>> {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', readStream);
    const url = `/users/background-image`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return axiosResponse.data;
  }

  public async getUserFromToken(): Promise<NormalizedResponseDTO<UserDTO>> {
    const url = `/user`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async getAccessTokens(): Promise<NormalizedResponseDTO<KysoUserAccessToken[]>> {
    const url = `/users/access-tokens`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken[]>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createAccessToken(createKysoAccessTokenDto: CreateKysoAccessTokenDto): Promise<NormalizedResponseDTO<KysoUserAccessToken>> {
    const url = `/users/access-token`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken>> = await this.httpClient.post(url, createKysoAccessTokenDto);
    return axiosResponse.data;
  }

  public async revokeAllAccessTokens(): Promise<NormalizedResponseDTO<KysoUserAccessToken[]>> {
    const url = `/users/access-token/revoke-all`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken[]>> = await this.httpClient.patch(url);
    return axiosResponse.data;
  }

  public async deleteAccessToken(accessTokenId: string): Promise<NormalizedResponseDTO<KysoUserAccessToken>> {
    const url = `/users/access-token/${accessTokenId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  public async verifyCaptcha(token: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/users/verify-captcha`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, { token });
    return axiosResponse.data;
  }

  public async recoverPassword(emailUserChangePasswordDTO: EmailUserChangePasswordDTO): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/users/email-recovery-password`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, emailUserChangePasswordDTO);
    return axiosResponse.data;
  }

  public async changePassword(userChangePasswordDto: UserChangePasswordDTO): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/users/change-password`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, userChangePasswordDto);
    return axiosResponse.data;
  }

  // SEARCH USER

  public async getSearchUser(organizationId: string, teamId?: string): Promise<NormalizedResponseDTO<SearchUser>> {
    let url = `/search-user?organization_id=${organizationId}`;
    if (teamId) {
      url += `&team_id=${teamId}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<SearchUser>> = await this.httpClient.get(url);
    return axiosResponse.data;
  }

  public async createSearchUser(searchUserDto: SearchUserDto): Promise<NormalizedResponseDTO<SearchUser>> {
    const url = `/search-user`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<SearchUser>> = await this.httpClient.post(url, searchUserDto);
    return axiosResponse.data;
  }

  public async deleteSearchUser(id: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/search-user/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }

  // IMPORT S3 WEBHOOK
  public async importS3Bucket(data: any): Promise<any> {
    const url = `/reports/import/office/s3`;
    const axiosResponse: AxiosResponse<any> = await this.httpClient.post(url, data);

    return axiosResponse.data;
  }

  // THEMES

  public async downloadTheme(themeName: string): Promise<Buffer> {
    const url = `/themes/${themeName}`;
    const axiosResponse: AxiosResponse<Buffer> = await this.httpClient.get(url, { responseType: 'arraybuffer' });
    return axiosResponse.data;
  }

  public async uploadTheme(themeName: string, readStream: ReadStream): Promise<NormalizedResponseDTO<boolean>> {
    const formData = new FormData();
    formData.append('name', themeName);
    formData.append('file', readStream);
    const url = `/themes`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return axiosResponse.data;
  }

  public async setDefaultTheme(themeName: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/themes/${themeName}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.put(url);
    return axiosResponse.data;
  }

  public async deleteTheme(themeName: string): Promise<NormalizedResponseDTO<boolean>> {
    const url = `/themes/${themeName}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await this.httpClient.delete(url);
    return axiosResponse.data;
  }
}
