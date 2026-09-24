import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();

  const prompt = [
    'Photorealistic cinematic photograph of a professional male web designer working in a modern creative studio',
    'late 20s to mid 30s man with short well-groomed hair, light stubble, wearing a dark casual shirt or sweater',
    'seated at a clean minimal wooden desk facing a large ultrawide monitor that displays a website design layout in progress',
    'monitor screen shows a website wireframe / homepage mockup with editorial typography and design tool UI',
    'modern creative studio environment with dark navy blue walls, subtle warm yellow accent lighting',
    'a second monitor or laptop visible to the side, soft natural window light mixed with cinematic interior lighting',
    'premium sophisticated dark cinematic atmosphere, shallow depth of field, professional editorial photography',
    'subtle blue and yellow color accents in the scene that complement a deep blue + warm yellow brand palette',
    'real photography appearance, not an illustration or cartoon, hyperrealistic, high detail, 4K',
    'shot on Canon EOS R5 with 35mm f/1.4 lens, soft bokeh background',
  ].join(', ');

  console.log('Generating image…');
  const response = await zai.images.generations.create({
    prompt,
    size: '1344x768',
  });

  const b64 = response.data?.[0]?.base64;
  if (!b64) {
    console.error('No image data returned');
    process.exit(1);
  }

  const buffer = Buffer.from(b64, 'base64');
  const out = '/home/z/my-project/public/hero/studio.jpg';
  fs.writeFileSync(out, buffer);
  console.log(`Saved: ${out} (${buffer.length} bytes)`);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
