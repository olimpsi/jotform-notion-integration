export default async function handler(req, res) {
  console.log('Webhook recebido');
  console.log('Método:', req.method);
  console.log('Body:', JSON.stringify(req.body));
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST permitido' });
  }

  try {
    const body = req.body;
    
    // Log dos dados recebidos
    console.log('=== DADOS COMPLETOS DO JOTFORM ===');
    console.log(JSON.stringify(body, null, 2));
    console.log('==================================');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Webhook recebido com sucesso. Verifique os logs.' 
    });
    
  } catch (error) {
    console.error('ERRO:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
