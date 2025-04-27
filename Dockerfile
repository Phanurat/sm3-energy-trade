# ใช้ Node.js official image
FROM node:16

# ตั้ง working directory ภายใน container
WORKDIR /usr/src/app

# Copy package.json และ package-lock.json (หรือ yarn.lock) ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดโปรเจคทั้งหมดไปยัง container
COPY . .

# เปิด port ที่แอปจะฟัง
EXPOSE 3000

# รัน server.js เมื่อ container เริ่มทำงาน
CMD ["node", "server.js"]
