const request = require('superagent');

 module.exports = (app) => {
    app.post('/api/stock/portfolio', function (req, res, next) {
    const apiKey='3KYYJ04S8PXDYJ9O.1..5'
    const tickers = ['MSFT'];
    let completed =0;
    const results =[];
    console.log('ok');
    for (let i=0 ; i<tickers.length ;i += 1){  
          const ticker=tickers[i] ;
          console.log('ticker',ticker);   
        request
        .get('https://www.alphavantage.co/query')
        .query({ 'function': 'TIME_SERIES_INTRADAY' })
        .query({ symbol: ticker })
        .query({'interval':'5min'})
        .query({ apikey: apiKey })     
        .then(response => {
            completed += 1;
            //console.log('res',res.body);
            results.push(response.body);
            if(completed === tickers.length){
                    console.log('completed');
                    console.log('RESULT',results)
                    res.send({
                        success: true,
                        message:'Ticker info',
                        results: results
                    })
            }
            
        });
    }
    });
}; 