mkdir Pammi
cd Pammi/
git clone https://github.com/shabados/database.git
cd database/
bun --version
node --version
npm --version
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
bun --version
bun install
bun run collections:validate
bun run database:build
