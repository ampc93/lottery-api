import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

redis.on('connect', () =>{
    console.log('Conexión a Redis establecida correctamente');
});

redis.on('error', (err) =>{
    console.error('Error al conectar a Redis:', err);
});

export default redis;