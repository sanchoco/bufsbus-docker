FROM mariadb:10.5.8

ADD ./init_database /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]
