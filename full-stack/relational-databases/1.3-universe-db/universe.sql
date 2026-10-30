--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(40) NOT NULL,
    diameter_in_km numeric(8,2),
    discovered_year integer,
    near_earth boolean,
    description text,
    star_id integer
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(40) NOT NULL,
    galaxy_type character varying(30),
    distance_from_earth_mly numeric(10,2),
    description text
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(40) NOT NULL,
    distance_from_planet_km integer,
    planet_id integer,
    description text,
    has_atmosphere boolean
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(40) NOT NULL,
    radius integer,
    habitable boolean,
    has_moons boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(40) NOT NULL,
    diameter_in_km numeric(10,2),
    description text,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'Ceres', 939.40, 1801, false, 'Largest object in the asteroid belt, also a dwarf planet', 1);
INSERT INTO public.asteroid VALUES (2, 'Vesta', 525.40, 1807, false, 'Second most massive asteroid in the belt', 1);
INSERT INTO public.asteroid VALUES (3, 'Pallas', 512.00, 1802, false, 'Third largest asteroid, with a tilted orbit', 1);
INSERT INTO public.asteroid VALUES (4, 'Eros', 16.84, 1898, true, 'First near-Earth asteroid discovered', 1);
INSERT INTO public.asteroid VALUES (5, 'Bennu', 0.49, 1999, true, 'Sample-return target of OSIRIS-REx', 1);
INSERT INTO public.asteroid VALUES (6, 'Apophis', 0.37, 2004, true, 'Near-Earth asteroid that passes very close in 2029', 1);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Barred spiral', 0.00, 'Our home galaxy, containing the Solar System');
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 'Barred spiral', 2.54, 'Nearest large galaxy, on a collision course with the Milky Way');
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 'Spiral', 2.73, 'Third-largest galaxy in the Local Group');
INSERT INTO public.galaxy VALUES (4, 'Whirlpool', 'Spiral', 23.00, 'Classic grand-design spiral interacting with a smaller companion');
INSERT INTO public.galaxy VALUES (5, 'Sombrero', 'Spiral', 29.00, 'Named for its bright nucleus and prominent dust lane');
INSERT INTO public.galaxy VALUES (6, 'Large Magellanic Cloud', 'Irregular', 0.16, 'Satellite galaxy of the Milky Way');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 384400, 1, 'Earth''s only natural satellite', false);
INSERT INTO public.moon VALUES (2, 'Phobos', 9376, 2, 'Largest Martian moon, orbits very close to Mars', false);
INSERT INTO public.moon VALUES (3, 'Deimos', 23463, 2, 'Smaller, outer moon of Mars', false);
INSERT INTO public.moon VALUES (8, 'Io', 421700, 3, 'Volcanically active moon of Jupiter', true);
INSERT INTO public.moon VALUES (9, 'Europa', 671034, 3, 'Icy moon with a subsurface ocean', true);
INSERT INTO public.moon VALUES (10, 'Ganymede', 1070412, 3, 'Largest moon in the solar system', true);
INSERT INTO public.moon VALUES (11, 'Callisto', 1882709, 3, 'Heavily cratered, ancient surface', true);
INSERT INTO public.moon VALUES (4, 'Metis', 127690, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (5, 'Adrastea', 128690, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (6, 'Amalthea', 181366, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (7, 'Thebe', 221889, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (12, 'Themisto', 7393216, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (13, 'Leda', 11165000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (14, 'Himalia', 11461000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (15, 'Lysithea', 11717000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (16, 'Elara', 11741000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (17, 'Ananke', 21276000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (18, 'Carme', 23404000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (19, 'Pasiphae', 23624000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (20, 'Sinope', 23939000, 3, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (21, 'Cinder', 45000, 8, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (22, 'Ember', 98000, 8, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (23, 'Ashfall', 210000, 8, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (24, 'Kethra', 60000, 9, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (25, 'Draal', 120000, 9, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (26, 'Voss', 340000, 9, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (27, 'Ilun', 780000, 9, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (29, 'Aeris', 150000, 11, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (30, 'Calyx', 410000, 11, 'Small natural satellite', false);
INSERT INTO public.moon VALUES (28, 'Lumis', 35000, 11, 'Small natural satellite', true);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Earth', 6371, true, true, 1);
INSERT INTO public.planet VALUES (2, 'Mars', 3390, false, true, 1);
INSERT INTO public.planet VALUES (3, 'Jupiter', 69911, false, true, 1);
INSERT INTO public.planet VALUES (4, 'Proxima b', 7000, true, false, 3);
INSERT INTO public.planet VALUES (5, 'Proxima d', 5200, false, false, 3);
INSERT INTO public.planet VALUES (6, 'Aldebaran b', 70000, false, false, 4);
INSERT INTO public.planet VALUES (7, 'Sirius Alpha I', 5800, false, false, 2);
INSERT INTO public.planet VALUES (8, 'Sirius Alpha II', 12000, false, true, 2);
INSERT INTO public.planet VALUES (9, 'Vorlon', 25000, false, true, 5);
INSERT INTO public.planet VALUES (10, 'Karthos', 8400, false, false, 5);
INSERT INTO public.planet VALUES (11, 'Zephyra', 6900, true, true, 6);
INSERT INTO public.planet VALUES (12, 'Nyx Prime', 4100, false, false, 6);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 1392684.00, 'The star at the center of our solar system', 1);
INSERT INTO public.star VALUES (2, 'Sirius A', 2380000.00, 'Brightest star in the night sky', 1);
INSERT INTO public.star VALUES (3, 'Proxima Centauri', 200000.00, 'Red dwarf, the closest known star to the Sun', 1);
INSERT INTO public.star VALUES (4, 'Aldebaran', 61000000.00, 'Orange giant in the constellation Taurus', 1);
INSERT INTO public.star VALUES (5, 'R136a1', 48000000.00, 'One of the most massive known stars', 6);
INSERT INTO public.star VALUES (6, 'Sanduleak -69 202', 30000000.00, 'Blue supergiant that became supernova SN 1987A', 6);


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 6, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 30, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: asteroid asteroid_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

