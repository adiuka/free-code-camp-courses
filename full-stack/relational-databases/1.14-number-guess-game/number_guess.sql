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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    user_id integer NOT NULL,
    guesses integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(22) NOT NULL
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (1, 1, 6);
INSERT INTO public.games VALUES (2, 10, 515);
INSERT INTO public.games VALUES (3, 10, 110);
INSERT INTO public.games VALUES (4, 11, 515);
INSERT INTO public.games VALUES (5, 11, 862);
INSERT INTO public.games VALUES (6, 10, 876);
INSERT INTO public.games VALUES (7, 10, 372);
INSERT INTO public.games VALUES (8, 10, 69);
INSERT INTO public.games VALUES (9, 1, 1);
INSERT INTO public.games VALUES (10, 12, 734);
INSERT INTO public.games VALUES (11, 12, 767);
INSERT INTO public.games VALUES (12, 13, 604);
INSERT INTO public.games VALUES (13, 13, 834);
INSERT INTO public.games VALUES (14, 12, 259);
INSERT INTO public.games VALUES (15, 12, 76);
INSERT INTO public.games VALUES (16, 12, 545);
INSERT INTO public.games VALUES (17, 14, 578);
INSERT INTO public.games VALUES (18, 14, 637);
INSERT INTO public.games VALUES (19, 15, 711);
INSERT INTO public.games VALUES (20, 15, 21);
INSERT INTO public.games VALUES (21, 14, 965);
INSERT INTO public.games VALUES (22, 14, 457);
INSERT INTO public.games VALUES (23, 14, 608);
INSERT INTO public.games VALUES (24, 16, 444);
INSERT INTO public.games VALUES (25, 16, 451);
INSERT INTO public.games VALUES (26, 17, 628);
INSERT INTO public.games VALUES (27, 17, 929);
INSERT INTO public.games VALUES (28, 16, 536);
INSERT INTO public.games VALUES (29, 16, 695);
INSERT INTO public.games VALUES (30, 16, 347);
INSERT INTO public.games VALUES (31, 18, 69);
INSERT INTO public.games VALUES (32, 18, 181);
INSERT INTO public.games VALUES (33, 19, 457);
INSERT INTO public.games VALUES (34, 19, 52);
INSERT INTO public.games VALUES (35, 18, 322);
INSERT INTO public.games VALUES (36, 18, 503);
INSERT INTO public.games VALUES (37, 18, 629);
INSERT INTO public.games VALUES (38, 20, 804);
INSERT INTO public.games VALUES (39, 20, 433);
INSERT INTO public.games VALUES (40, 21, 206);
INSERT INTO public.games VALUES (41, 21, 28);
INSERT INTO public.games VALUES (42, 20, 269);
INSERT INTO public.games VALUES (43, 20, 447);
INSERT INTO public.games VALUES (44, 20, 603);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (1, 'Adiuka');
INSERT INTO public.users VALUES (2, 'user_1794125274322');
INSERT INTO public.users VALUES (3, 'user_1794125274321');
INSERT INTO public.users VALUES (4, 'user_1794125412402');
INSERT INTO public.users VALUES (5, 'user_1794125412401');
INSERT INTO public.users VALUES (6, 'user_1794125524147');
INSERT INTO public.users VALUES (7, 'user_1794125524146');
INSERT INTO public.users VALUES (8, 'user_1794125553077');
INSERT INTO public.users VALUES (9, 'user_1794125553076');
INSERT INTO public.users VALUES (10, 'user_1794125807331');
INSERT INTO public.users VALUES (11, 'user_1794125807330');
INSERT INTO public.users VALUES (12, 'user_1794125927630');
INSERT INTO public.users VALUES (13, 'user_1794125927629');
INSERT INTO public.users VALUES (14, 'user_1794125965834');
INSERT INTO public.users VALUES (15, 'user_1794125965833');
INSERT INTO public.users VALUES (16, 'user_1794126029884');
INSERT INTO public.users VALUES (17, 'user_1794126029883');
INSERT INTO public.users VALUES (18, 'user_1794126085875');
INSERT INTO public.users VALUES (19, 'user_1794126085874');
INSERT INTO public.users VALUES (20, 'user_1794126159982');
INSERT INTO public.users VALUES (21, 'user_1794126159981');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 44, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 21, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

