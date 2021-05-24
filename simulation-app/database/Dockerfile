FROM postgres:13.3-alpine
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=atlas_simulation
COPY init.sql /docker-entrypoint-initdb.d/init.sql
