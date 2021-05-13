FROM postgres:latest
ENV POSTGRES_PASSWORD=atlas
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=simulation_files
COPY database.sql /docker-entrypoint-initdb.d/database.sql