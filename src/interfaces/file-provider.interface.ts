export interface IFileProvider{
    getMimeType(path: string): string;
    getFileContent(path: string): string;
    getAbsoluteFilePath(path: string): string;
}