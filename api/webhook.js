export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const formData = req.body;
    
    const nome = formData['q1_nomeDo'] || '';
    const data = formData['q2_data'] || '';
    const relato = formData['q3_relato'] || '';
    const atividadePratica = formData['q4_atividadePratica'] || '';
    const atendimentoIndividual = formData['q5_atendimentoIndividual'] || '';
    const anexo = formData['q6_anexoDe'] || '';

    const notionPayload = {
      parent: { database_id: '357ec500a6fc808e8c03d26a5e7b7ef0' },
      properties: {
        'Nome': {
          title: [{ text: { content: nome } }]
        },
        'Data': {
          date: data ? { start: data } : null
        },
        'Relato': {
          rich_text: [{ text: { content: relato } }]
        },
        'Atividade Prática': {
          rich_text: [{ text: { content: atividadePratica } }]
        },
        'Atendimento Individual': {
          rich_text: [{ text: { content: atendimentoIndividual } }]
        }
      }
    };

    if (anexo && typeof anexo === 'string') {
      notionPayload.properties['Anexos'] = {
        files: [{ type: 'external', name: 'Anexo', external: { url: anexo } }]
      };
    }

    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(notionPayload)
    });

    const notionData = await notionResponse.json();

    if (!notionResponse.ok) {
      console.error('Erro Notion:', notionData);
      return res.status(500).json({ error: 'Erro ao criar entrada no Notion', details: notionData });
    }

    return res.status(200).json({ success: true, notionPage: notionData.id });
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno', message: error.message });
  }
}
