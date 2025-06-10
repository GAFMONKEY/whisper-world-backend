-- Make sure pgcrypto (gen_random_uuid) is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "user"
("id", "firstName", "lastName", "gender",
 "email",            "password",
 "datingPreferences","likert")
VALUES
    (gen_random_uuid(), 'Alice',   'Anderson', 'male',
     'alice.anderson@example.com', 'password123',
     'female,male,other',
     '{"closeness":4,"openness":4,"quietness":2}'),

    (gen_random_uuid(), 'Bob',     'Brown',    'female',
     'bob.brown@example.com',      'password123',
     'other,male',
     '{"closeness":5,"openness":3,"quietness":3}'),

    (gen_random_uuid(), 'Charlie', 'Clark',    'other',
     'charlie.clark@example.com',  'password123',
     'male,female',
     '{"closeness":2,"openness":2,"quietness":1}'),

    (gen_random_uuid(), 'Diana',   'Davis',    'male',
     'diana.davis@example.com',    'password123',
     'male,female,other',
     '{"closeness":4,"openness":4,"quietness":1}'),

    (gen_random_uuid(), 'Ethan',   'Evans',    'female',
     'ethan.evans@example.com',    'password123',
     'other,female',
     '{"closeness":1,"openness":4,"quietness":5}'),

    (gen_random_uuid(), 'Fiona',   'Foster',   'other',
     'fiona.foster@example.com',   'password123',
     'female,male',
     '{"closeness":5,"openness":3,"quietness":1}'),

    (gen_random_uuid(), 'George',  'Garcia',   'male',
     'george.garcia@example.com',  'password123',
     'other',
     '{"closeness":1,"openness":4,"quietness":2}'),

    (gen_random_uuid(), 'Hannah',  'Hill',     'female',
     'hannah.hill@example.com',    'password123',
     'female,male',
     '{"closeness":5,"openness":4,"quietness":3}'),

    (gen_random_uuid(), 'Ian',     'Irwin',    'other',
     'ian.irwin@example.com',      'password123',
     'other',
     '{"closeness":2,"openness":3,"quietness":1}'),

    (gen_random_uuid(), 'Julia',   'Johnson',  'male',
     'julia.johnson@example.com',  'password123',
     'female,male,other',
     '{"closeness":2,"openness":3,"quietness":4}');
