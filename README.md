# Shui – Frontend

Detta är frontend-delen av **Shui-anslagstavlan**.  
Byggt med **React (Vite + TypeScript + Tailwind)** och kopplat mot ett serverless-API i AWS.

---

## Funktioner

- Posta ett nytt meddelande (username + text)
- Se alla meddelanden
- Ändra ett tidigare postat meddelande (med 404-koll i backend)
- Design i form av post-it-lappar på en anslagstavla

---

## Teknik

- **React + Vite + TypeScript**
- **Tailwind CSS** för styling
- **Serverless API i AWS** (API Gateway + Lambda + DynamoDB)
- Hostas i **S3-bucket** (statisk webb)

---

## Kom igång lokalt

Klona repot och installera dependencies:

```bash
git clone https://github.com/< k1rr1 >/shui-frontend.git
cd shui-frontend
npm install
