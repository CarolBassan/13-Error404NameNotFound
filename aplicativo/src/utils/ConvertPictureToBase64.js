import * as ImageManipulator from 'expo-image-manipulator';

export default async function PictureToBase64(photo) {
  if (!photo || !photo.uri) return null;

  try {
    // Reduzir a imagem para 800x600 antes de converter em base64
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 800, height: 600 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    return manipulatedImage.base64;
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
    return null;
  }
}
