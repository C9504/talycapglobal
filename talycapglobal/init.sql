--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: priorities; Type: TABLE; Schema: public; Owner: tasks
--

CREATE TABLE public.priorities (
    id uuid NOT NULL,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE public.priorities OWNER TO tasks;

--
-- Name: status; Type: TABLE; Schema: public; Owner: tasks
--

CREATE TABLE public.status (
    id uuid NOT NULL,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE public.status OWNER TO tasks;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: tasks
--

CREATE TABLE public.tasks (
    begin_date bigint,
    end_date bigint,
    id uuid NOT NULL,
    priority_id uuid,
    status_id uuid,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE public.tasks OWNER TO tasks;

--
-- Data for Name: priorities; Type: TABLE DATA; Schema: public; Owner: tasks
--

COPY public.priorities (id, description, name) FROM stdin;
efdfada2-083b-42a4-b859-c15ed2baec2c	Iniciada	Iniciada
665c825c-81bc-447a-9472-2eb09ff2405b	Proceso	Proceso
d7572a08-2c17-43e8-a8cc-3121ec40e6ca	Terminada	Terminada
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: tasks
--

COPY public.status (id, description, name) FROM stdin;
a6cf88fa-5cd8-4c21-a1cb-56a0f86fb639	Bajo	Bajo
a328698c-4c0b-4600-bf76-f7bfdab43307	Normal	Normal
3f0ebd7b-5758-42ba-9c24-adf721307403	Urgente	Urgente
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: tasks
--

COPY public.tasks (begin_date, end_date, id, priority_id, status_id, description, name) FROM stdin;
1717218000000	1717304400000	496ecb28-b31b-4a6d-b034-a28655753994	efdfada2-083b-42a4-b859-c15ed2baec2c	a328698c-4c0b-4600-bf76-f7bfdab43307	Design	Design
1717218000000	1717304400000	f8363853-5873-42fe-b477-ece66c5049b3	efdfada2-083b-42a4-b859-c15ed2baec2c	3f0ebd7b-5758-42ba-9c24-adf721307403	Web Design	Web Design
\.


--
-- Name: priorities priorities_pkey; Type: CONSTRAINT; Schema: public; Owner: tasks
--

ALTER TABLE ONLY public.priorities
    ADD CONSTRAINT priorities_pkey PRIMARY KEY (id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: tasks
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: tasks
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: tasks fkfmlm4rxoa19247blv9g96eacd; Type: FK CONSTRAINT; Schema: public; Owner: tasks
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fkfmlm4rxoa19247blv9g96eacd FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- Name: tasks fknq0d4mra8tpuwwak86ctvhfsb; Type: FK CONSTRAINT; Schema: public; Owner: tasks
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fknq0d4mra8tpuwwak86ctvhfsb FOREIGN KEY (priority_id) REFERENCES public.priorities(id);


--
-- PostgreSQL database dump complete
--

