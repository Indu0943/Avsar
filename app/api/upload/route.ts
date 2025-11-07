import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files uploaded' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'camera')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedFiles = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const originalName = file.name.replace(/\s+/g, '_')
      const filename = `${timestamp}_${originalName}`
      const filepath = path.join(uploadDir, filename)

      // Save file
      await writeFile(filepath, buffer)

      uploadedFiles.push({
        originalName: file.name,
        filename: filename,
        path: `/uploads/camera/${filename}`,
        size: file.size,
        type: file.type,
      })
    }

    return NextResponse.json(
      { success: true, files: uploadedFiles },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
