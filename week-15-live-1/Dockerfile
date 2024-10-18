# Base Image (22 is the version and alpine is a leaner version of it)
FROM node:22-alpine

# Working Directory (when containe starts put everything in app dir)
WORKDIR /app

#Copy Over files
COPY . .

# Run commands to build the code
RUN npm install
RUN npm run build
RUN npx prisma generate

# Expose ports(beacse index.js is listening on 3000 port)
EXPOSE 3000

#Final command that runs when running the container
CMD ["node", "dist/index.js"]
# everything above CMD runs when we create our image
# everything runs when we start our image