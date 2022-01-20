import { NormalizedResponse, Report, UpdateReportRequest } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { LOGGER } from '../..';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';

export const createReportAction = createAsyncThunk('reports/createReport', async (paths: any[] = [], { getState }) => {
  try {
    const { repos } = getState() as RootState;
    let reports;
    if (paths.length > 0) {
      reports = paths.map((path: any) => ({
        src: {
          provider: repos.provider,
          owner: repos.active!.owner,
          name: repos.active!.name,
          default_branch: repos.active!.default_branch,
          path,
        },
      }));
    } else {
      reports = {
        src: {
          provider: repos.provider,
          owner: repos.active!.owner,
          name: repos.active!.name,
          default_branch: repos.active!.default_branch,
        },
      };
    }
    const url = '/reports';
    const axiosResponse: AxiosResponse<NormalizedResponse<Report>> = await httpClient.post(url, reports);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchReportAction = createAsyncThunk('reports/fetchReport', async (payload: { owner: string; reportName: string }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Report>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchReportsAction = createAsyncThunk('reports/fetchReports', async (_, { getState, dispatch }) => {
  try {
    LOGGER.trace("fetchReportsAction invoked")
    const { reports } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports?page=${reports.page}&per_page=${reports.limit}&sort=desc`;
    
    LOGGER.trace(`GET ${url}`)
    const axiosResponse: AxiosResponse<NormalizedResponse<Report[]>> = await httpClient.get(url);

    if (axiosResponse?.data.data) {
      LOGGER.trace(`axiosResponse: ${axiosResponse}`)
      return axiosResponse.data.data;
    } else {
      LOGGER.trace(`Response didn't have data, returning an empty array []`)
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`Error processing action: ${e.toString()}`)
    dispatch(setError(e.toString()))
    return []
  }
});

export const updateReportAction = createAsyncThunk('reports/updateReport', async (payload: { owner: string; reportName: string; data: UpdateReportRequest }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Report>> = await httpClient.patch(url, payload.data);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const pinReportAction = createAsyncThunk('reports/pinReport', async (payload: { owner: string; reportName: string }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}/pin`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Report>> = await httpClient.post(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchBranchesAction = createAsyncThunk('reports/fetchBranches', async (payload: { owner: string; reportName: string }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}/branches`;
    const axiosResponse: AxiosResponse<NormalizedResponse<any[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchCommitsAction = createAsyncThunk('reports/fetchCommits', async (payload: { owner: string; reportName: string; branch: string }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}/${payload.branch}/commits`;
    const axiosResponse: AxiosResponse<NormalizedResponse<any[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchReposTreeAction = createAsyncThunk('reports/fetchTree', async (payload: { owner: string; reportName: string; branch: string; filePath: string }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}/${payload.branch}/tree/${payload.filePath}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Report>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});


export const deleteReportAction = createAsyncThunk('reports/deleteReport', async (payload: { owner: string; reportName: string }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}`;
    await httpClient.delete(url);
    return null;
  } catch {
    return null;
  }
});

export const fetchPinnedReportAction = createAsyncThunk('reports/fetchPinnedReport', async () => {
  try {
    const url = `/get-pinned-post`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Report>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchFileContentsAction = createAsyncThunk('reports/fetchFileContents', async (payload: { owner: string; reportName: string; hash: string }, { getState }) => {
  try {
    const { reports } = getState() as RootState;
    let hash = payload.hash;
    if (reports.tree) {
      hash = reports.tree[0].hash;
    }
    const url = `/reports/${payload.owner}/${payload.reportName}/file/${hash}`;
    const axiosResponse: AxiosResponse<any> = await httpClient.get(url);
    if (axiosResponse?.data) {
      return axiosResponse.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
