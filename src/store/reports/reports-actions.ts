import { GithubFileHash, KysoConfigFile, NormalizedResponseDTO, Report, ReportDTO, ReportType, UpdateReportRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AdmZip from 'adm-zip';
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { createReadStream, readFileSync, statSync } from 'fs';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchReportAction = createAsyncThunk('reports/fetchReport', async (reportId: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log('fetchReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    // console.log(`fetchReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      // console.log(`fetchReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchReportsAction = createAsyncThunk(
  'reports/fetchReports',
  async (payload: { filter?: object; sort?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<ReportDTO[]> => {
    try {
      // console.log('fetchReportsAction invoked');
      const { auth } = getState() as RootState;

      const qs = new URLSearchParams({
        page: (payload?.page || 1).toString(),
        per_page: (payload?.per_page || 20).toString(),
        sort: payload?.sort && payload.sort.length > 0 ? payload.sort : '-created_at',
        ...payload?.filter,
      });

      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports?${qs.toString()}`;
      // console.log(`fetchReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data.data) {
        // console.log(`fetchReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchReportsAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchReportsAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return [];
    }
  }
);

export const fetchReportByReportNameAndTeamName = createAsyncThunk(
  'reports/fetchReportByReportNameAndTeamName',
  async (args: { reportName: string; teamName: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      // console.log('fetchReportByReportNameAndTeamNameAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportName}/${args.teamName}`;
      // console.log(`fetchReportByReportNameAndTeamNameAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportByReportNameAndTeamNameAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data.data) {
        // console.log(`fetchReportByReportNameAndTeamNameAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchReportByReportNameAndTeamNameAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`fetchReportByReportNameAndTeamNameAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const updateReportAction = createAsyncThunk('reports/updateReport', async (payload: { reportId: string; data: UpdateReportRequestDTO }, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log('updateReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}`;
    // console.log(`updateReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(url, payload.data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`updateReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`updateReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`updateReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`updateReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchBranchesAction = createAsyncThunk('reports/fetchBranches', async (reportId: string, { getState, dispatch }): Promise<any[]> => {
  try {
    // console.log('fetchBranchesAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/branches`;
    // console.log(`fetchBranchesAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchBranchesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchBranchesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchBranchesAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchBranchesAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const fetchCommitsAction = createAsyncThunk('reports/fetchCommits', async (payload: { reportId: string; branch: string }, { getState, dispatch }): Promise<any[]> => {
  try {
    // console.log('fetchCommitsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/${payload.branch}/commits`;
    // console.log(`fetchCommitsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchCommitsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchCommitsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchCommitsAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchCommitsAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const fetchReportsTreeAction = createAsyncThunk(
  'reports/fetchReportsTree',
  async (args: { reportId: string; branch: string; filePath: string; version?: number }, { getState, dispatch }): Promise<GithubFileHash[]> => {
    try {
      // console.log('fetchReportsTreeAction invoked');
      const { auth } = getState() as RootState;
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportId}/${args.branch}/tree?path=${args.filePath}`;
      if (args.version) {
        url += `&version=${args.version}`;
      }
      // console.log(`fetchReportsTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportsTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchReportsTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchReportsTreeAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchReportsTreeAction: Error processing action: ${e.toString()}`);
      return [];
    }
  }
);

export const deleteReportAction = createAsyncThunk('reports/deleteReport', async (reportId: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log('deleteReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    // console.log(`deleteReportAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchUserPinnedReportsAction = createAsyncThunk('reports/fetchUserPinnedReports', async (userId: string, { getState, dispatch }): Promise<Report[]> => {
  try {
    // console.log('fetchUserPinnedReportsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pinned`;
    // console.log(`fetchUserPinnedReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchUserPinnedReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserPinnedReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchUserPinnedReportsAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchUserPinnedReportsAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const fetchFileContentAction = createAsyncThunk(
  'reports/fetchFileContent',
  async (payload: { reportId: string; hash: string; path?: string }, { getState, dispatch }): Promise<Buffer | null> => {
    try {
      // console.log('fetchFileContentAction invoked');
      const { auth } = getState() as RootState;
      const hash = payload.hash;

      // what is this, I have no idea?
      // if (reports.tree) {
      //   hash = reports.tree[0].hash;
      // }
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/file/${hash}`;
      if (payload.path && payload.path.length > 0) {
        url += `?path=${payload.path}`;
      }
      // console.log(`fetchFileContentAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data) {
        // console.log(`fetchFileContentAction: axiosResponse ${JSON.stringify(axiosResponse.data)}`);
        return axiosResponse.data;
      } else {
        // console.log(`fetchFileContentAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`fetchFileContentAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const fetchEmbeddedFileContentAction = createAsyncThunk(
  'reports/fetchEmbeddedFileContent',
  async (payload: { reportId: string; hash: string; path?: string }, { getState, dispatch }): Promise<Buffer | null> => {
    try {
      // console.log('fetchEmbeddedFileContentAction invoked');
      const { auth } = getState() as RootState;
      const hash = payload.hash;

      // what is this, I have no idea?
      // if (reports.tree) {
      //   hash = reports.tree[0].hash;
      // }
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/embedded/${payload.reportId}/file/${hash}`;
      if (payload.path && payload.path.length > 0) {
        url += `?path=${payload.path}`;
      }
      // console.log(`fetchEmbeddedFileContentAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data) {
        // console.log(`fetchEmbeddedFileContentAction: axiosResponse ${JSON.stringify(axiosResponse.data)}`);
        return axiosResponse.data;
      } else {
        // console.log(`fetchEmbeddedFileContentAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`fetchEmbeddedFileContentAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const toggleUserPinReportAction = createAsyncThunk('reports/toggleUserPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('toggleUserPinReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/user-pin`;
    // console.log(`toggleUserPinReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`toggleUserPinReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`toggleUserPinReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`toggleUserPinReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`toggleUserPinReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const toggleGlobalPinReportAction = createAsyncThunk('reports/toggleGlobalPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('toggleGlobalPinReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/pin`;
    // console.log(`toggleGlobalPinReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`toggleGlobalPinReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`toggleGlobalPinReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`toggleGlobalPinReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`toggleGlobalPinReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const toggleUserStarReportAction = createAsyncThunk('reports/toggleUserStarReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('toggleUserStarReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/user-star`;
    // console.log(`toggleUserStarReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`toggleUserStarReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`toggleUserStarReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`toggleUserStarReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`toggleUserStarReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const createKysoReportAction = createAsyncThunk(
  'reports/createKysoReportAction',
  async (payload: { filePaths: string[]; basePath: string | null }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/kyso`;
      const formData: FormData = new FormData();
      const zipFileName = `${uuidv4()}.zip`;
      const outputFilePath = `/tmp/${zipFileName}`;
      const zip = new AdmZip();
      for (const file of payload.filePaths) {
        const filename = payload?.basePath && payload.basePath.length > 0 ? file.replace(payload.basePath + '/', '') : file;
        zip.addFile(filename, readFileSync(file));
      }
      zip.writeZip(outputFilePath);
      formData.append('file', createReadStream(outputFilePath), {
        filename: zipFileName,
        knownLength: statSync(outputFilePath).size,
      });
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: {
          ...buildAuthHeaders(auth),
          ...formData.getHeaders(),
          'content-length': formData.getLengthSync(),
        },
      });
      if (axiosResponse?.data?.relations) {
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        return axiosResponse.data.data;
      } else {
        return null;
      }
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return e;
    }
  }
);

export const createKysoReportUIAction = createAsyncThunk(
  'reports/createKysoReportUI',
  async (
    args: { title: string; organization: string; team: string; description: string; tags: string[]; files: File[]; mainContent: string | null; reportType: ReportType | null },
    { getState, dispatch }
  ): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/ui`;
      const zip = new JSZip();
      // Create kyso.json on the fly
      const kysoConfigFile: KysoConfigFile = {
        main: '',
        title: args.title,
        description: args.description,
        organization: args.organization,
        team: args.team,
        tags: args.tags,
        type: args.reportType,
      };
      if (args.mainContent && args.mainContent.length > 0) {
        const blobReadme: Blob = new Blob([args.mainContent], { type: 'plain/text' });
        zip.file('README.md', blobReadme);
        kysoConfigFile.main = 'README.md';
      }
      const blobKysoConfigFile: Blob = new Blob([JSON.stringify(kysoConfigFile, null, 2)], { type: 'plain/text' });
      zip.file('kyso.json', blobKysoConfigFile);
      for (const file of args.files) {
        zip.file(file.name, file);
      }
      const blobZip = await zip.generateAsync({ type: 'blob' });
      const formData = new FormData();
      formData.append('file', blobZip);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: {
          ...buildAuthHeaders(auth),
          headers: { 'content-type': 'multipart/form-data' },
        },
      });
      if (axiosResponse?.data?.relations) {
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        return axiosResponse.data.data;
      } else {
        return null;
      }
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const updateMainFileReportAction = createAsyncThunk(
  'reports/updateMainFileReportAction',
  async (args: { reportId: string; mainContent: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      // console.log(`updateMainFileReportAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/ui/main-file/${args.reportId}`;
      // console.log(`updateMainFileReportAction: ${printAuthenticated(auth)} - POST ${url}`);
      const formData: FormData = new FormData();
      const blobReadme: Blob = new Blob([args.mainContent], { type: 'plain/text' });
      formData.append('file', blobReadme, 'README.md');

      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: {
          ...buildAuthHeaders(auth),
          headers: { 'content-type': 'multipart/form-data' },
        },
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateMainFileReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateMainFileReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateMainFileReportAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(e);
      // console.log(`updateMainFileReportAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const importGithubRepositoryAction = createAsyncThunk(
  'reports/importGithubRepository',
  async (args: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    // try {
    // console.log(`importGithubRepositoryAction invoked`);
    const { auth } = getState() as RootState;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/github/${args.repositoryName}`;
    if (args?.branch) {
      url = `${url}?branch=${args.branch}`;
    }
    // console.log(`importGithubRepositoryAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`importGithubRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`importGithubRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`importGithubRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
    // } catch (e: any) {
    //   console.log(`importGithubRepositoryAction: Error processing action: ${e.toString()}`);
    //   dispatch(setError(e.toString()));
    //   return null;
    // }
  }
);

export const importBitbucketRepositoryAction = createAsyncThunk(
  'reports/importBitbucketRepository',
  async (args: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    // try {
    // console.log(`importBitbucketRepositoryAction invoked`);
    const { auth } = getState() as RootState;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/bitbucket?name=${args.repositoryName}`;
    if (args?.branch) {
      url += `&branch=${args.branch}`;
    }
    // console.log(`importBitbucketRepositoryAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`importBitbucketRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`importBitbucketRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`importBitbucketRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
    // } catch (e: any) {
    //   // console.log(e);
    //   // console.log(`importBitbucketRepositoryAction: Error processing action: ${e.toString()}`);
    //   dispatch(setError(e.toString()));
    //   return null;
    // }
  }
);

export const pullReportAction = createAsyncThunk('reports/pullReport', async (payload: { reportName: string; teamName: string }, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    // console.log(`pullReportAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportName}/${payload.teamName}/pull`;
    // console.log(`pullReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
      responseType: 'arraybuffer',
    });
    return axiosResponse.data;
  } catch (e: any) {
    console.log(`pullReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const downloadReportAction = createAsyncThunk('reports/downloadReport', async (reportId: string, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    // console.log(`downloadReportAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/download`;
    // console.log(`downloadReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
      responseType: 'arraybuffer',
    });
    return axiosResponse.data;
  } catch (e: any) {
    // console.log(`downloadReportAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const updateReportPreviewPictureAction = createAsyncThunk(
  'user/updateOrganizationProfilePicture',
  async (args: { reportId: string; file: File }, { dispatch, getState }): Promise<ReportDTO | null> => {
    try {
      // console.log('updateReportPreviewPictureAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportId}/preview-picture`;
      // console.log(`updateReportPreviewPictureAction: ${printAuthenticated(auth)} - POST ${url}`);
      const formData = new FormData();
      formData.append('file', args.file);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateReportPreviewPictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateReportPreviewPictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateReportPreviewPictureAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateReportPreviewPictureAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const deleteReportPreviewPictureAction = createAsyncThunk('user/deleteReportPreviewPicture', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('deleteReportPreviewPictureAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/preview-picture`;
    // console.log(`deleteReportPreviewPictureAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteReportPreviewPictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteReportPreviewPictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteReportPreviewPictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteReportPreviewPictureAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchReportFilesAction = createAsyncThunk('reports/fetchReportFiles', async (args: { reportId: string; version: number }, { getState, dispatch }): Promise<File[] | null> => {
  try {
    // console.log('fetchReportFilesAction invoked');
    const { auth } = getState() as RootState;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportId}/files`;
    if (args.version && args.version > 0) {
      url += `?version=${args.version}`;
    }
    // console.log(`fetchReportFilesAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<File[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchReportFilesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchReportFilesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchReportFilesAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchReportFilesAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchReportVersionsAction = createAsyncThunk(
  'reports/fetchReportVersions',
  async (args: { reportId: string; sort: string }, { getState, dispatch }): Promise<{ version: number; created_at: Date; num_files: number }[]> => {
    try {
      // console.log('fetchReportVersionsAction invoked');
      const { auth } = getState() as RootState;
      const qs = new URLSearchParams({
        sort: args?.sort && args.sort.length > 0 ? args.sort : '-created_at',
      });
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportId}/versions?${qs.toString()}`;
      // console.log(`fetchReportVersionsAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<{ version: number; created_at: Date; num_files: number }[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportVersionsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchReportVersionsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchReportVersionsAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchReportVersionsAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return [];
    }
  }
);

export const fetchEmbeddedReportAction = createAsyncThunk(
  'reports/fetchEmbeddedReport',
  async (args: { organizationName: string; teamName: string; reportName: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      // console.log('fetchEmbeddedReportAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/embedded/${args.organizationName}/${args.teamName}/${args.reportName}`;
      // console.log(`fetchEmbeddedReportAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchEmbeddedReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchEmbeddedReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchEmbeddedReportAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`fetchEmbeddedReportAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const checkReportExistsAction = createAsyncThunk('reports/checkReportExists', async (args: { teamId: string; reportName: string }, { getState, dispatch }): Promise<boolean> => {
  try {
    // console.log('checkReportExistsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportName}/${args.teamId}/exists`;
    // console.log(`checkReportExistsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<boolean> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    return axiosResponse.data;
  } catch (e: any) {
    // console.log(`checkReportExistsAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});
