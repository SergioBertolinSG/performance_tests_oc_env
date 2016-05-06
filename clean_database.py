#!/usr/bin/python

import MySQLdb

db = MySQLdb.connect ('localhost', 'root', 'root')
cursor = db.cursor()

cursor.execute ("select * from information_schema.SCHEMATA where SCHEMA_NAME='owncloud'")

dbExists = cursor.fetchone()
if dbExists is not None:
  cursor.execute ("drop database owncloud")

cursor.execute ("select * from mysql.user where User='oc_at_admin'")
userExists = cursor.fetchone()
if userExists is not None:
   cursor.execute ("drop user oc_at_admin")
   cursor.execute ("drop user oc_at_admin@localhost")

db.close()
