FROM nikolaik/python-nodejs

# Handle frontend
COPY client/dist/client client/dist/client

# Handle backend
COPY server server
WORKDIR server
RUN npm install package
RUN pip3 install pandas numpy sklearn

# Run
CMD node server.js
EXPOSE 80