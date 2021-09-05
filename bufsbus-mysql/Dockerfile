FROM mysql:5.7

ADD ./init_database /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]