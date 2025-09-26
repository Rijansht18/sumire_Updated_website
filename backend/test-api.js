const axios = require('axios');

const testAPI = async () => {
  try {
    console.log('Testing University API...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check:', healthResponse.data.message);
    
    // Test universities endpoint
    const universitiesResponse = await axios.get('http://localhost:5000/api/universities');
    console.log('✅ Universities loaded:', universitiesResponse.data.data.length, 'universities');
    
    // Display first university
    if (universitiesResponse.data.data.length > 0) {
      const firstUni = universitiesResponse.data.data[0];
      console.log('📚 First university:', firstUni.name, '-', firstUni.location);
    }
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the backend server is running: npm run dev');
    }
  }
};

testAPI();