-- Make sure pgcrypto (gen_random_uuid) is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "user"
("id", "firstName", "lastName", "gender",
 "birthDate",                   -- NEW
 "email", "password",
 "datingPreferences",           -- simple-array
 "interests",                   -- NEW simple-array
 "likert")                      -- jsonb
VALUES
    (gen_random_uuid(), 'Alice',   'Anderson', 'male',
     '1998-02-14',
     'alice.anderson@example.com', 'password123',
     'female,male,other',
     'hiking,reading,cooking',
     '{"closeness":4,"openness":4,"quietness":2}'),

    (gen_random_uuid(), 'Bob',     'Brown',    'female',
     '1995-07-30',
     'bob.brown@example.com',      'password123',
     'other,male',
     'gaming,photography,bouldering',
     '{"closeness":5,"openness":3,"quietness":3}'),

    (gen_random_uuid(), 'Charlie', 'Clark',    'other',
     '2001-12-05',
     'charlie.clark@example.com',  'password123',
     'male,female',
     'music,travel,cycling',
     '{"closeness":2,"openness":2,"quietness":1}'),

    (gen_random_uuid(), 'Diana',   'Davis',    'male',
     '1993-04-18',
     'diana.davis@example.com',    'password123',
     'male,female,other',
     'painting,yoga,thrifting',
     '{"closeness":4,"openness":4,"quietness":1}'),

    (gen_random_uuid(), 'Ethan',   'Evans',    'female',
     '1999-11-11',
     'ethan.evans@example.com',    'password123',
     'other,female',
     'running,chess,cooking',
     '{"closeness":1,"openness":4,"quietness":5}'),

    (gen_random_uuid(), 'Fiona',   'Foster',   'other',
     '1996-03-22',
     'fiona.foster@example.com',   'password123',
     'female,male',
     'gardening,board-games,swimming',
     '{"closeness":5,"openness":3,"quietness":1}'),

    (gen_random_uuid(), 'George',  'Garcia',   'male',
     '2000-09-08',
     'george.garcia@example.com',  'password123',
     'other',
     'soccer,tech-meetups,coffee-roasting',
     '{"closeness":1,"openness":4,"quietness":2}'),

    (gen_random_uuid(), 'Hannah',  'Hill',     'female',
     '1997-01-27',
     'hannah.hill@example.com',    'password123',
     'female,male',
     'sketching,latin-dance,reading',
     '{"closeness":5,"openness":4,"quietness":3}'),

    (gen_random_uuid(), 'Ian',     'Irwin',    'other',
     '1994-05-06',
     'ian.irwin@example.com',      'password123',
     'other',
     'film-making,climbing,meditation',
     '{"closeness":2,"openness":3,"quietness":1}'),

    (gen_random_uuid(), 'Julia',   'Johnson',  'male',
     '2002-10-19',
     'julia.johnson@example.com',  'password123',
     'female,male,other',
     'piano,basketball,photography',
     '{"closeness":2,"openness":3,"quietness":4}');
