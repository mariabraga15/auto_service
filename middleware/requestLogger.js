module.exports = (req, res, next) => {
    const start = Date.now();
  
    res.on('finish', () => {
      const timestamp = new Date().toISOString();
      const method = req.method;
      const path = req.originalUrl;
      const status = res.statusCode;
      const duration = Date.now() - start;
  
      console.log(`[${timestamp}] ${method} ${path} -> ${status} (${duration} ms)`);
    });
  
    next();
  };
  