
export interface TransformationOptions {
    width: number,
    height: number,
    quality: number
}

export interface FileOptions {
    format: string,
    transformations: TransformationOptions | null
}

