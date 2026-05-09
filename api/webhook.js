export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // LOGA TUDO QUE O JOTFORM ENVIA
    console.log('===== DADOS RECEBIDOS DO JOTFORM =====');
    console.log(JSON.stringify(req.body, null, 2));
    console.log('======================================');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Dados recebidos e logados. Verifique os logs da Vercel.' 
    });
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno', message: error.message });
  }
}
