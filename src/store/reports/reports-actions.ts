import { File as KysoFile, GithubFileHash, GitMetadata, KysoConfigFile, NormalizedResponseDTO, Report, ReportDTO, ReportType, UpdateReportRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AdmZip from 'adm-zip';
import axios from 'axios';
import FormData from 'form-data';
import { createReadStream, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, statSync } from 'fs';
import JSZip from 'jszip';
import { homedir } from 'os';
import { join } from 'path';
import slash from 'slash';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '..';
import { Api } from '../../api';
import { verbose } from '../../helpers/logger-helper';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';
import { setRequestingReports } from './reports-slice';

const parseFileSizeStr = (fileSizeStr: string): number => {
  const units: string[] = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  const size: number = parseFloat(fileSizeStr);
  const unit: string = fileSizeStr.replace(/[^a-z]/gi, '').toLowerCase();
  const power: number = units.indexOf(unit);
  return Math.floor(size * Math.pow(1024, power));
};

export const fetchReportAction = createAsyncThunk('reports/fetchReport', async (reportId: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<ReportDTO> = await api.getReportById(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response.data) {
      return response.data;
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
});

export const fetchReportsAction = createAsyncThunk(
  'reports/fetchReports',
  async (payload: { filter?: object; sort?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<ReportDTO[]> => {
    try {
      await dispatch(setRequestingReports(true));
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO[]> = await api.getReports(payload);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      await dispatch(setRequestingReports(false));
      if (response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      await dispatch(setRequestingReports(false));
      return [];
    }
  },
);

export const fetchReportByReportNameAndTeamName = createAsyncThunk(
  'reports/fetchReportByReportNameAndTeamName',
  async (args: { reportName: string; teamName: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO> = await api.getReportByReportNameAndTeamName(args.reportName, args.teamName);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response.data) {
        return response.data;
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
  },
);

export const updateReportAction = createAsyncThunk('reports/updateReport', async (payload: { reportId: string; data: UpdateReportRequestDTO }, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<ReportDTO> = await api.updateReport(payload.reportId, payload.data);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const fetchReportsTreeAction = createAsyncThunk(
  'reports/fetchReportsTree',
  async (args: { reportId: string; filePath: string; version?: number }, { getState, dispatch }): Promise<GithubFileHash | GithubFileHash[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<GithubFileHash | GithubFileHash[]> = await api.getReportFileTree(args);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (e: any) {
      return [];
    }
  },
);

export const deleteReportAction = createAsyncThunk('reports/deleteReport', async (reportId: string, { getState, dispatch }): Promise<Report | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Report> = await api.deleteReport(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const fetchFileContentAction = createAsyncThunk('reports/fetchFileContent', async (fileId: string, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: Buffer = await api.getReportFileContent(fileId);
    if (response) {
      return response;
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
});

export const toggleUserPinReportAction = createAsyncThunk('reports/toggleUserPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<ReportDTO> = await api.toggleUserPinReport(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const toggleGlobalPinReportAction = createAsyncThunk('reports/toggleGlobalPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<ReportDTO> = await api.toggleGlobalPinReport(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const toggleUserStarReportAction = createAsyncThunk('reports/toggleUserStarReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<ReportDTO> = await api.toggleUserStarReport(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const createKysoReportAction = createAsyncThunk(
  'reports/createKysoReportAction',
  async (
    payload: { filePaths: string[]; basePath: string | null; maxFileSizeStr: string; message: string; git_metadata: GitMetadata | null },
    { getState, dispatch },
  ): Promise<NormalizedResponseDTO<ReportDTO | ReportDTO[]> | null> => {
    const zipFileName = `${uuidv4()}.zip`;
    let outputFilePath: string = join(homedir(), '.kyso', 'tmp');
    // Check if folder exists, if not create it
    if (!existsSync(outputFilePath)) {
      mkdirSync(outputFilePath, {
        recursive: true,
      });
    }
    outputFilePath = join(outputFilePath, zipFileName);
    try {
      verbose('Starting createKysoReportAction');
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const formData: FormData = new FormData();
      verbose(`outputFilePath ${outputFilePath}`);
      const zip = new AdmZip();
      verbose(`Adding files to zip`);
      for (const file of payload.filePaths) {
        let filename;
        if (process.platform === 'win32') {
          filename = payload?.basePath && payload.basePath.length > 0 ? file.replace(payload.basePath + '\\', '') : file;
        } else {
          filename = payload?.basePath && payload.basePath.length > 0 ? file.replace(payload.basePath + '/', '') : file;
        }
        if (!lstatSync(file).isDirectory()) {
          zip.addFile(slash(filename), readFileSync(file));
        }
      }
      zip.writeZip(outputFilePath);
      const size: number = statSync(outputFilePath).size;
      const maxFileSize: number = parseFileSizeStr(payload.maxFileSizeStr);
      if (size > maxFileSize) {
        verbose(`You exceeded the maximum upload size permitted (${payload.maxFileSizeStr})`);
        dispatch(setError(`You exceeded the maximum upload size permitted (${payload.maxFileSizeStr})`));
        return null;
      }
      formData.append('file', createReadStream(outputFilePath), {
        filename: zipFileName,
        knownLength: size,
      });
      formData.append('message', payload.message ?? '');
      if (payload.git_metadata) {
        formData.append('git_metadata', JSON.stringify(payload.git_metadata));
      }
      const response: NormalizedResponseDTO<ReportDTO> = await api.createKysoReport(formData);
      try {
        verbose(`Deleting temporary file at ${zipFileName}`);
        rmSync(outputFilePath, { force: true });
      } catch (ex) {
        console.log("Temporary file can't be deleted");
        console.log(ex);
      }
      verbose(`Response received ${response} - ${response}`);
      verbose(`createKysoReportAction finished successfully`);
      return response;
    } catch (e: any) {
      if (existsSync(outputFilePath)) {
        try {
          verbose(`Deleting temporary file at ${zipFileName}`);
          rmSync(outputFilePath);
        } catch (ex) {
          console.log("Temporary file can't be deleted");
          console.log(ex);
        }
      }
      if (axios.isAxiosError(e)) {
        verbose(e);
        console.log(e.response?.data.message);
        dispatch(setError(e.response?.data.message));
      } else {
        verbose(e);
        dispatch(setError(e.toString()));
      }
      return null;
    }
  },
);

export const updateKysoReportAction = createAsyncThunk(
  'reports/updateKysoReportAction',
  async (
    payload: {
      filePaths: string[];
      basePath: string | null;
      maxFileSizeStr: string;
      id: string;
      version: number;
      unmodifiedFiles: string[];
      deletedFiles: string[];
      message: string;
      git_metadata: GitMetadata | null;
    },
    { getState, dispatch },
  ): Promise<NormalizedResponseDTO<ReportDTO | ReportDTO[]> | null> => {
    const zipFileName = `${uuidv4()}.zip`;
    let outputFilePath: string = join(homedir(), '.kyso', 'tmp');
    // Check if folder exists, if not create it
    if (!existsSync(outputFilePath)) {
      mkdirSync(outputFilePath, {
        recursive: true,
      });
    }
    outputFilePath = join(outputFilePath, zipFileName);
    try {
      verbose('Starting updateKysoReportAction');
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const formData: FormData = new FormData();
      verbose(`outputFilePath ${outputFilePath}`);
      const zip = new AdmZip();
      verbose(`Adding files to zip`);
      for (const file of payload.filePaths) {
        let filename;
        if (process.platform === 'win32') {
          filename = payload?.basePath && payload.basePath.length > 0 ? file.replace(payload.basePath + '\\', '') : file;
        } else {
          filename = payload?.basePath && payload.basePath.length > 0 ? file.replace(payload.basePath + '/', '') : file;
        }
        if (!lstatSync(file).isDirectory()) {
          zip.addFile(slash(filename), readFileSync(file));
        }
      }
      zip.writeZip(outputFilePath);
      const size: number = statSync(outputFilePath).size;
      const maxFileSize: number = parseFileSizeStr(payload.maxFileSizeStr);
      if (size > maxFileSize) {
        verbose(`You exceeded the maximum upload size permitted (${payload.maxFileSizeStr})`);
        dispatch(setError(`You exceeded the maximum upload size permitted (${payload.maxFileSizeStr})`));
        return null;
      }
      formData.append('file', createReadStream(outputFilePath), {
        filename: zipFileName,
        knownLength: size,
      });
      formData.append('version', payload.version.toString());
      formData.append('unmodifiedFiles', JSON.stringify(payload.unmodifiedFiles));
      formData.append('deletedFiles', JSON.stringify(payload.deletedFiles));
      formData.append('message', payload.message ?? '');
      if (payload.git_metadata) {
        formData.append('git_metadata', JSON.stringify(payload.git_metadata));
      }
      const response: NormalizedResponseDTO<ReportDTO> = await api.updateKysoReport(payload.id, formData);
      try {
        verbose(`Deleting temporary file at ${zipFileName}`);
        rmSync(outputFilePath, { force: true });
      } catch (ex) {
        console.log("Temporary file can't be deleted");
        console.log(ex);
      }
      verbose(`Response received ${response} - ${response}`);
      verbose(`updateKysoReportAction finished successfully`);
      return response;
    } catch (e: any) {
      if (existsSync(outputFilePath)) {
        try {
          verbose(`Deleting temporary file at ${zipFileName}`);
          rmSync(outputFilePath);
        } catch (ex) {
          console.log("Temporary file can't be deleted");
          console.log(ex);
        }
      }
      if (axios.isAxiosError(e)) {
        verbose(e);
        console.log(e.response?.data.message);
        dispatch(setError(e.response?.data.message));
      } else {
        verbose(e);
        dispatch(setError(e.toString()));
      }
      return null;
    }
  },
);

export const createKysoReportUIAction = createAsyncThunk(
  'reports/createKysoReportUI',
  async (
    args: {
      title: string;
      organization: string;
      team: string;
      description: string;
      tags: string[];
      files: File[];
      mainContent: string | null;
      reportType: ReportType | null;
      authors: string[];
      message: string;
      git_metadata: GitMetadata | null;
    },
    { getState, dispatch },
  ): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const zip = new JSZip();
      const kysoConfigFile: KysoConfigFile = new KysoConfigFile('', args.title, args.description, args.organization, args.team, args.tags, args.reportType);
      kysoConfigFile.authors = args.authors;
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
      formData.append('message', args.message ?? '');
      if (args.git_metadata) {
        formData.append('git_metadata', JSON.stringify(args.git_metadata));
      }
      const response: NormalizedResponseDTO<ReportDTO> = await api.createUiReport(formData);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const updateMainFileReportAction = createAsyncThunk(
  'reports/updateMainFileReportAction',
  async (args: { reportId: string; mainContent: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const formData: FormData = new FormData();
      const blobReadme: Blob = new Blob([args.mainContent], { type: 'plain/text' });
      formData.append('file', blobReadme, 'README.md');
      const response: NormalizedResponseDTO<ReportDTO> = await api.updateMainFileReport(args.reportId, formData);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const importGithubRepositoryAction = createAsyncThunk(
  'reports/importGithubRepository',
  async (args: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO> = await api.importGithubRepository(args.repositoryName, args.branch);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const importBitbucketRepositoryAction = createAsyncThunk(
  'reports/importBitbucketRepository',
  async (args: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO> = await api.importBitbucketRepository(args.repositoryName, args.branch);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const importGitlabRepositoryAction = createAsyncThunk(
  'reports/importGitlabRepository',
  async (args: { repositoryName: number | string; branch: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO> = await api.importGitlabRepository(args.repositoryName, args.branch);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const pullReportAction = createAsyncThunk('reports/pullReport', async (payload: { reportName: string; teamName: string; version?: number }, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: Buffer = await api.pullReport(payload.reportName, payload.teamName, payload.version);
    return response;
  } catch (e: any) {
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
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: Buffer = await api.downloadReport(reportId);
    return response;
  } catch (e: any) {
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
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO> = await api.updateReportImage(args.reportId, args.file);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const deleteReportPreviewPictureAction = createAsyncThunk('user/deleteReportPreviewPicture', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<ReportDTO> = await api.deleteReportImage(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const fetchReportFilesAction = createAsyncThunk('reports/fetchReportFiles', async (args: { reportId: string; version: number }, { getState, dispatch }): Promise<KysoFile[] | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<KysoFile[]> = await api.getReportFiles(args.reportId, args.version);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
});

export const fetchReportVersionsAction = createAsyncThunk(
  'reports/fetchReportVersions',
  async (args: { reportId: string; sort: string }, { getState, dispatch }): Promise<{ version: number; created_at: Date; num_files: number }[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<{ version: number; created_at: Date; num_files: number }[]> = await api.getReportVersions(args.reportId, args.sort);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return [];
    }
  },
);

export const fetchEmbeddedReportAction = createAsyncThunk(
  'reports/fetchEmbeddedReport',
  async (args: { organizationName: string; teamName: string; reportName: string }, { getState, dispatch }): Promise<ReportDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<ReportDTO> = await api.getEmbeddedReport(args.organizationName, args.teamName, args.reportName);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
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
  },
);

export const checkReportExistsAction = createAsyncThunk('reports/checkReportExists', async (args: { teamId: string; reportName: string }, { getState, dispatch }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: boolean = await api.reportExists(args.teamId, args.reportName);
    return response;
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});
