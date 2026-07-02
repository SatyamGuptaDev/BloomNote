import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  const manifestPath = path.join(process.cwd(), 'public', 'flowers', 'manifest.json')
  
  if (!fs.existsSync(manifestPath)) {
    console.log('No manifest.json found at', manifestPath)
    return
  }

  const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  
  for (const asset of manifestData) {
    await prisma.flowerAsset.upsert({
      where: { id: asset.id },
      update: {
        name: asset.name,
        category: asset.category,
        colorTag: asset.colorTag,
        meaningTag: asset.meaningTag,
        imagePath: asset.imagePath,
      },
      create: {
        id: asset.id,
        name: asset.name,
        category: asset.category,
        colorTag: asset.colorTag,
        meaningTag: asset.meaningTag,
        imagePath: asset.imagePath,
      }
    })
  }

  console.log('Seeded flower assets successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
