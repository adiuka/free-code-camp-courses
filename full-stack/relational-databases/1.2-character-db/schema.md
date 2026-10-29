# character-db schema

## List of relations
+--------+-----------------------------+----------+--------------+
| Schema |            Name             |   Type   |    Owner     |
+--------+-----------------------------+----------+--------------+
| public | actions                     | table    | freecodecamp |
| public | actions_action_id_seq       | sequence | freecodecamp |
| public | character_actions           | table    | freecodecamp |
| public | characters                  | table    | freecodecamp |
| public | characters_character_id_seq | sequence | freecodecamp |
| public | more_info                   | table    | freecodecamp |
| public | more_info_more_info_id_seq  | sequence | freecodecamp |
| public | sounds                      | table    | freecodecamp |
| public | sounds_sound_id_seq         | sequence | freecodecamp |
+--------+-----------------------------+----------+--------------+


## characters table
Table "public.characters"
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
|     Column     |         Type          | Collation | Nullable |                     Default                      |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
| character_id   | integer               |           | not null | nextval('characters_character_id_seq'::regclass) |
| name           | character varying(30) |           | not null |                                                  |
| homeland       | character varying(60) |           | not null |                                                  |
| favorite_color | character varying(30) |           |          |                                                  |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
Indexes:
    "characters_pkey" PRIMARY KEY, btree (character_id)
Referenced by:
    TABLE "character_actions" CONSTRAINT "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
    TABLE "more_info" CONSTRAINT "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
    TABLE "sounds" CONSTRAINT "sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
(7 rows)


## more-info table
Table "public.more_info"
+--------------+--------------+-----------+----------+-------------------------------------------------+
|    Column    |     Type     | Collation | Nullable |                     Default                     |
+--------------+--------------+-----------+----------+-------------------------------------------------+
| more_info_id | integer      |           | not null | nextval('more_info_more_info_id_seq'::regclass) |
| birthday     | date         |           |          |                                                 |
| height_in_cm | integer      |           |          |                                                 |
| weight_in_kg | numeric(4,1) |           |          |                                                 |
| character_id | integer      |           | not null |                                                 |
+--------------+--------------+-----------+----------+-------------------------------------------------+
Indexes:
    "more_info_pkey" PRIMARY KEY, btree (more_info_id)
    "more_info_character_id_key" UNIQUE CONSTRAINT, btree (character_id)
Foreign-key constraints:
    "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)


## sounds table
Table "public.sounds"
+--------------+-----------------------+-----------+----------+------------------------------------------+
|    Column    |         Type          | Collation | Nullable |                 Default                  |
+--------------+-----------------------+-----------+----------+------------------------------------------+
| sound_id     | integer               |           | not null | nextval('sounds_sound_id_seq'::regclass) |
| filename     | character varying(40) |           | not null |                                          |
| character_id | integer               |           | not null |                                          |
+--------------+-----------------------+-----------+----------+------------------------------------------+
Indexes:
    "sounds_pkey" PRIMARY KEY, btree (sound_id)
    "sounds_filename_key" UNIQUE CONSTRAINT, btree (filename)
Foreign-key constraints:
    "sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)

## actions table
Table "public.actions"
+-----------+-----------------------+-----------+----------+--------------------------------------------+
|  Column   |         Type          | Collation | Nullable |                  Default                   |
+-----------+-----------------------+-----------+----------+--------------------------------------------+
| action_id | integer               |           | not null | nextval('actions_action_id_seq'::regclass) |
| action    | character varying(20) |           | not null |                                            |
+-----------+-----------------------+-----------+----------+--------------------------------------------+
Indexes:
    "actions_pkey" PRIMARY KEY, btree (action_id)
    "actions_action_key" UNIQUE CONSTRAINT, btree (action)
Referenced by:
    TABLE "character_actions" CONSTRAINT "character_actions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(action_id)

## character-actions table
Table "public.character_actions"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| character_id | integer |           | not null |         |
| action_id    | integer |           | not null |         |
+--------------+---------+-----------+----------+---------+
Indexes:
    "character_actions_pkey" PRIMARY KEY, btree (character_id, action_id)
Foreign-key constraints:
    "character_actions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(action_id)
    "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)


SELECT * FROM character_actions FULL JOIN characters ON character_actions.character_id = characters.character_id FULL JOIN actions ON character_actions.action_id = actions.action_id;