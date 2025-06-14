import { API_URL } from '@env'
console.log(API_URL);

export async function getDescriptionImage(base64Image) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: base64Image,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        return data.message || 'Descrição não encontrada';
    } catch (error) {
        console.error('Erro ao enviar imagem:', error);
        return null;
    }
}