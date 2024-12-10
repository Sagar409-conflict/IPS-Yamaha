import fs from 'fs'

export const createDirIfNotExists = (dirPath:string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}