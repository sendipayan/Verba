const user=process.env.USERNAME;
const pass = encodeURIComponent(process.env.PASSWORD);


export const connectionSrt="mongodb+srv://"+user+":"+pass+"@cluster0.giv8z.mongodb.net/public_speaking?retryWrites=true&w=majority&appName=Cluster0"