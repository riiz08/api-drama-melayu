--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2025-04-23 09:47:10

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
-- TOC entry 5 (class 2615 OID 18641)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4805 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 18655)
-- Name: Drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Drama" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    thumbnail text NOT NULL,
    "tarikhTayangan" text,
    "waktuSiaran" text,
    rangkaian text,
    pengarah text,
    produksi text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Drama" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18663)
-- Name: Episode; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Episode" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    "episodeNum" text,
    "videoSrc" text NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "dramaId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Episode" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 18642)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4798 (class 0 OID 18655)
-- Dependencies: 216
-- Data for Name: Drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Drama" (id, slug, title, description, thumbnail, "tarikhTayangan", "waktuSiaran", rangkaian, pengarah, produksi, "createdAt", "updatedAt") FROM stdin;
cm9sjl7is0000tzc445szhdo6	dia-imamku	Dia Imamku	Nantikan drama adaptasi novel 'Dia Imamku' karya Siti Rosmizah akan datang di slot MegaDrama Astro Ria pada 17 Februari 2025. Drama bersiri 52 episod arahan Feroz Kader, dibintangi watak utama iaitu Siti Saleha dan Kamal Adli.	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisCy5yi454VCm4z8cQw8O3_iYQThBp5ognTEdwwav0mPhLj8SkP3e7RO6zhJ6-gAy4U191J-XCuqPX3l6eNkUVW1sifiN573AgK6DRUoIgYLv1GUwH01Pf0EpZdvDN7hNdkox6N1-vRKBWe9sV1J8hBJnz2pA7CXKlMZgCmlliGmD54jbxgy-uHtIBplfp/s1600/dia%20imamku.jpg	17 Februari 2025	Isnin hingga Khamis, 10:00 malam	Astro Ria, Astro GO	Feroz Kader	SR One Sdn Bhd	2025-04-22 13:30:06.292	2025-04-22 13:30:06.292
cm9sudclc002itzfg73dqjnek	sekam-di-dada	Sekam Di Dada	Nantikan drama bersiri 'Dari Rahim Yang Sama' terbitan Saphire Screen Sdn Bhd akan disiarkan menerusi slot Samarinda TV3 pada 14 April 2025. Diarahkan oleh Zamri Zakaria dan membariskan pelakon utama Nabil Huda.	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdQpLbzv2XGO5V3F5vfBsPJjvPLXtxl7fgmR7jKa9Ntp2Fy8UktDHOLg4YQlOvPIHlhWuvd84KhCghlOXli6p7ZExMm3r9rc3hTI8AdEq3u-yEX-Tkak4aJ3zxz0xS38glMWbXbOOfc-5B-lGmhsYHBqrZHEvKhtBoY7yNL0IFXoeI_uifEi3GSj7-Kl9G/s1600/Dari%20Rahim.jpg	14 April 2025	Isnin hingga Khamis, 10:00 malam	Samarinda TV3 / Tonton	Zamri Zakaria	Saphire Screen Sdn Bhd	2025-04-22 18:31:55.392	2025-04-22 18:31:55.392
cm9sufq0f0030tzfgo6oyc6xg	calon-isteri-buat-suami	Calon Isteri Buat Suami	Nantkan drama adaptasi novel 'Calon Isteri Buat Suami' karya Sophilea akan disiarkan menerusi slot Akasia TV3 pada 8 April 2025. Drama terbitan Sha's Media Sdn Bhd diarahkan oleh Bahri Uma. Menampilkan pelakon utama Jazmy Juma dan Siti Hariesa.	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9PAIScH5Aa3a_scDTxWCkynmZQQqjBP50d7OEgXtWb8oiOxx8DgoT7BkWFHwb_I01wYT3MVmP1bgi1vpbTTMSxFLWnpbjx47rXZVcouKdJ-FxeGVPz-J1kLw-3uyKmezPceMFpdjMQRdk1w4JnH0xHBnVqyVwteqZzQSdoMUCsq6Ht8OguLDR6vgGOuDx/s1600/calon%20isteri.jpg	8 April 2025	Isnin hingga Jumaat, 7:00 malam	Akasia TV3	Bahri Uma	Sha's Media Sdn Bhd	2025-04-22 18:33:46.095	2025-04-22 18:33:46.095
cm9suk946003xtzfg11q683rz	dendam-seorang-madu	Dendam Seorang Madu	Nantikan drama Dendam Seorang Madu akan disiarkan di slot Tiara Astro Prima pada 3 mac 2025. Drama bersiri 50 episod terbitan MIG Production diarahkan oleh Riza Baharudin. Menampilkan watak utama iaitu Redza Rosli, Hannah Delisha dan Sweet Qismina.	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEinJYk2dL5WV4N1pZq-gVinAbRYWTnkER3wT21te-YczcjIBtBR5siWg2Zl8E9CZD_1sCG4k7kLhuIigcmD6_at9vMboMn6WWrKEGX8wJIsIgvFsFuRLgp4g9cZFxOFoE8vhhDWhSwsWnHfqtMZG2s7jqRxP8hROSt0K3bpET-u5j0Dk3Ujww2Gi1V98k8/s1600/dendam%20seorang%20madu.jpg	3 Mac 2025	Isnin hingga Jumaat, 6:00 petang	Astro Prima & Astro GO	Riza Baharudin	MIG Production Sdn Bhd	2025-04-22 18:37:17.478	2025-04-22 18:37:17.478
cm9suyg0l006vtzfgnih62fy0	keluarga-itu	Keluarga Itu	Nantikan drama bersiri 'Keluarga Itu' terbitan Rumah Karya Citra akan datang di slot  pada bulan ramadan nanti setiap Jumaat hingga Ahad 9 Malam. Menampilkan pelakon terkenal tanah air seperti Rosyam Nor, Umie Aida, Izara Aishah, Amir Ahnaf, Puteri Balqis, Fattah Amin dan ramai lagi.	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtXX982JditdT58BDl_bUdhJz3kr-DP0fNI48_yu7jQpLVeDTTSi-bhwTVZVhZqWTMoMHLHUyYJm3TIt6kaGu8aNdjJdITzh0OfavLKTNxSoJzkKkfllmPseFISTzBWEVCfcOS1ydZ-_8PpmuKzahu991NE7JVGt7VBdW97s2-kcJKeM1YhL2PmIFjAxHx/s1600/keluarga%20itu.jpg	28 februari 2025	Jumaat hingga Ahad, 9:00 malam	TV3 / Tonton	Nur Ain Sharif	Rumah Karya Citra Sdn Bhd	2025-04-22 18:48:19.605	2025-04-22 18:48:19.605
\.


--
-- TOC entry 4799 (class 0 OID 18663)
-- Dependencies: 217
-- Data for Name: Episode; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Episode" (id, slug, title, "episodeNum", "videoSrc", "publishedAt", "dramaId", "createdAt", "updatedAt") FROM stdin;
cm9sjl7jg0002tzc4oqzeq850	dia-imamku-full-episod-1	Dia Imamku - Full Episod 1	1	/videos/dia-imamku-1.m3u8	2025-02-15 12:38:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 13:30:06.313	2025-04-22 18:18:59.661
cm9stx4g60005tzfg1qgkbgn5	dia-imamku-full-episod-2	Dia Imamku - Full Episod 2	2	/videos/dia-imamku-2.m3u8	2025-02-17 00:35:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:19:18.342	2025-04-22 18:19:18.342
cm9stxki30008tzfggbgx0sfb	dia-imamku-full-episod-3	Dia Imamku - Full Episod 3	3	/videos/dia-imamku-3.m3u8	2025-02-18 06:43:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:19:39.147	2025-04-22 18:19:39.147
cm9stxyty000btzfgpz6przem	dia-imamku-full-episod-4	Dia Imamku - Full Episod 4	4	/videos/dia-imamku-4.m3u8	2025-02-19 03:31:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:19:57.718	2025-04-22 18:19:57.718
cm9stycwf000etzfg8apqll54	dia-imamku-full-episod-5	Dia Imamku - Full Episod 5	5	/videos/dia-imamku-5.m3u8	2025-02-21 23:24:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:20:15.951	2025-04-22 18:20:15.951
cm9stysrh000htzfg0um62yzj	dia-imamku-full-episod-6	Dia Imamku - Full Episod 6	6	/videos/dia-imamku-6.m3u8	2025-02-23 00:46:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:20:36.509	2025-04-22 18:20:36.509
cm9stz4sn000ktzfgh0gfrygo	dia-imamku-full-episod-7	Dia Imamku - Full Episod 7	7	/videos/dia-imamku-7.m3u8	2025-02-24 00:33:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:20:52.103	2025-04-22 18:20:52.103
cm9stzjc3000ntzfgi7w9z9x6	dia-imamku-full-episod-8	Dia Imamku - Full Episod 8	8	/videos/dia-imamku-8.m3u8	2025-02-25 03:58:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:21:10.948	2025-04-22 18:21:10.948
cm9stzxri000qtzfg9znev1lc	dia-imamku-full-episod-9	Dia Imamku - Full Episod 9	9	/videos/dia-imamku-9.m3u8	2025-02-28 02:38:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:21:29.646	2025-04-22 18:21:29.646
cm9su0a4r000ttzfgrbvkp43g	dia-imamku-full-episod-10	Dia Imamku - Full Episod 10	10	/videos/dia-imamku-10.m3u8	2025-03-02 05:26:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:21:45.675	2025-04-22 18:21:45.675
cm9su1vi3000ytzfgh0btcynt	dia-imamku-full-episod-13	Dia Imamku - Full Episod 13	13	/videos/dia-imamku-13.m3u8	2025-03-07 02:13:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:23:00.027	2025-04-22 18:23:00.027
cm9su3cog0012tzfgf4z2sy9i	dia-imamku-full-episod-15	Dia Imamku - Full Episod 15	15	/videos/dia-imamku-15.m3u8	2025-03-11 01:51:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:24:08.944	2025-04-22 18:24:08.944
cm9su53s00017tzfg06n2z81o	dia-imamku-full-episod-18	Dia Imamku - Full Episod 18	18	/videos/dia-imamku-18.m3u8	2025-03-16 01:23:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:25:30.72	2025-04-22 18:25:30.72
cm9su8bj2001htzfgj6rsllav	dia-imamku-full-episod-26	Dia Imamku - Full Episod 26	26	/videos/dia-imamku-26.m3u8	2025-03-30 07:11:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:28:00.734	2025-04-22 18:28:00.734
cm9su8qln001ktzfgjzacvve0	dia-imamku-full-episod-27	Dia Imamku - Full Episod 27	27	/videos/dia-imamku-27.m3u8	2025-03-31 13:01:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:28:20.268	2025-04-22 18:28:20.268
cm9su94q2001ntzfgq1w1ss5l	dia-imamku-full-episod-28	Dia Imamku - Full Episod 28	28	/videos/dia-imamku-28.m3u8	2025-04-01 03:01:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:28:38.57	2025-04-22 18:28:38.57
cm9su9iya001qtzfgpez6sxz4	dia-imamku-full-episod-29	Dia Imamku - Full Episod 29	29	/videos/dia-imamku-29.m3u8	2025-04-06 06:36:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:28:57.011	2025-04-22 18:28:57.011
cm9su9x4c001ttzfgugjf4kln	dia-imamku-full-episod-30	Dia Imamku - Full Episod 30	30	/videos/dia-imamku-30.m3u8	2025-04-07 06:52:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:29:15.372	2025-04-22 18:29:15.372
cm9suabkz001wtzfgjmg67jir	dia-imamku-full-episod-31	Dia Imamku - Full Episod 31	31	/videos/dia-imamku-31.m3u8	2025-04-08 06:13:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:29:34.115	2025-04-22 18:29:34.115
cm9suap5x001ztzfgtc6em8ns	dia-imamku-full-episod-32	Dia Imamku - Full Episod 32	32	/videos/dia-imamku-32.m3u8	2025-04-09 02:55:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:29:51.717	2025-04-22 18:29:51.717
cm9sub3k40022tzfg4yt69pnj	dia-imamku-full-episod-33	Dia Imamku - Full Episod 33	33	/videos/dia-imamku-33.m3u8	2025-04-11 02:48:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:30:10.372	2025-04-22 18:30:10.372
cm9subg5z0025tzfgt2t1phuj	dia-imamku-full-episod-34	Dia Imamku - Full Episod 34	34	/videos/dia-imamku-34.m3u8	2025-04-13 03:34:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:30:26.711	2025-04-22 18:30:26.711
cm9subu7g0028tzfgj0aldcmh	dia-imamku-full-episod-35	Dia Imamku - Full Episod 35	35	/videos/dia-imamku-35.m3u8	2025-04-14 06:33:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:30:44.909	2025-04-22 18:30:44.909
cm9suc7zp002btzfgluuh1u83	dia-imamku-full-episod-36	Dia Imamku - Full Episod 36	36	/videos/dia-imamku-36.m3u8	2025-04-15 01:07:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:31:02.774	2025-04-22 18:31:02.774
cm9suclw2002etzfgd6v4gnha	dia-imamku-full-episod-37	Dia Imamku - Full Episod 37	37	/videos/dia-imamku-37.m3u8	2025-04-20 00:35:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:31:20.786	2025-04-22 18:31:20.786
cm9sucyll002htzfghdi574kp	dia-imamku-full-episod-38	Dia Imamku - Full Episod 38	38	/videos/dia-imamku-38.m3u8	2025-04-21 03:19:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 18:31:37.257	2025-04-22 18:31:37.257
cm9sudcli002ktzfgi493t7cv	dari-rahim-yang-sama-full-episod-1	Dari Rahim Yang Sama - Full Episod 1	1	/videos/sekam-di-dada-1.m3u8	2025-04-13 03:31:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:31:55.398	2025-04-22 18:31:55.398
cm9sudrj6002ntzfg5e5z64na	dari-rahim-yang-sama-full-episod-2	Dari Rahim Yang Sama - Full Episod 2	2	/videos/sekam-di-dada-2.m3u8	2025-04-13 07:02:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:32:14.754	2025-04-22 18:32:14.754
cm9sue633002qtzfgpflw4rnq	dari-rahim-yang-sama-full-episod-3	Dari Rahim Yang Sama - Full Episod 3	3	/videos/sekam-di-dada-3.m3u8	2025-04-15 01:01:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:32:33.615	2025-04-22 18:32:33.615
cm9sueju3002ttzfgm4cna19y	dari-rahim-yang-sama-full-episod-4	Dari Rahim Yang Sama - Full Episod 4	4	/videos/sekam-di-dada-4.m3u8	2025-04-16 05:07:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:32:51.435	2025-04-22 18:32:51.435
cm9suexyx002wtzfg45hs0nxq	dari-rahim-yang-sama-full-episod-5	Dari Rahim Yang Sama - Full Episod 5	5	/videos/sekam-di-dada-5.m3u8	2025-04-20 00:31:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:33:09.753	2025-04-22 18:33:09.753
cm9sufckv002ztzfgine2prsd	dari-rahim-yang-sama-full-episod-6	Dari Rahim Yang Sama - Full Episod 6	6	/videos/sekam-di-dada-6.m3u8	2025-04-21 03:18:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:33:28.687	2025-04-22 18:33:28.687
cm9sufq0j0032tzfg30lmw3c5	calon-isteri-buat-suami-full-episod-1	Calon Isteri Buat Suami - Full Episod 1	1	/videos/calon-isteri-buat-suami-1.m3u8	2025-04-06 08:35:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:33:46.099	2025-04-22 18:33:46.099
cm9sug5ab0035tzfgj009lk7z	calon-isteri-buat-suami-full-episod-2	Calon Isteri Buat Suami - Full Episod 2	2	/videos/calon-isteri-buat-suami-2.m3u8	2025-04-08 06:10:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:34:05.892	2025-04-22 18:34:05.892
cm9sugjxl0038tzfg4r6sun5o	calon-isteri-buat-suami-full-episod-3	Calon Isteri Buat Suami - Full Episod 3	3	/videos/calon-isteri-buat-suami-3.m3u8	2025-04-09 02:53:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:34:24.873	2025-04-22 18:34:24.873
cm9sugxzs003btzfgbyiq4k9p	calon-isteri-buat-suami-full-episod-4	Calon Isteri Buat Suami - Full Episod 4	4	/videos/calon-isteri-buat-suami-4.m3u8	2025-04-10 03:49:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:34:43.096	2025-04-22 18:34:43.096
cm9suhc2r003etzfg1fvnivzm	calon-isteri-buat-suami-full-episod-5	Calon Isteri Buat Suami - Full Episod 5	5	/videos/calon-isteri-buat-suami-5.m3u8	2025-04-11 02:44:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:35:01.347	2025-04-22 18:35:01.347
cm9suhrip003htzfgbvpe03gx	calon-isteri-buat-suami-full-episod-6	Calon Isteri Buat Suami - Full Episod 6	6	/videos/calon-isteri-buat-suami-6.m3u8	2025-04-13 03:32:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:35:21.361	2025-04-22 18:35:21.361
cm9sui6gs003ktzfg0ei6yhxb	calon-isteri-buat-suami-full-episod-7	Calon Isteri Buat Suami - Full Episod 7	7	/videos/calon-isteri-buat-suami-7.m3u8	2025-04-14 06:14:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:35:40.732	2025-04-22 18:35:40.732
cm9suikak003ntzfgm0o4a3v8	calon-isteri-buat-suami-full-episod-8	Calon Isteri Buat Suami - Full Episod 8	8	/videos/calon-isteri-buat-suami-8.m3u8	2025-04-15 01:05:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:35:58.653	2025-04-22 18:35:58.653
cm9suiyvb003qtzfgin8wf836	calon-isteri-buat-suami-full-episod-9	Calon Isteri Buat Suami - Full Episod 9	9	/videos/calon-isteri-buat-suami-9.m3u8	2025-04-16 05:05:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:36:17.544	2025-04-22 18:36:17.544
cm9sujegg003ttzfgyptndiqj	calon-isteri-buat-suami-full-episod-10	Calon Isteri Buat Suami - Full Episod 10	10	/videos/calon-isteri-buat-suami-10.m3u8	2025-04-20 00:30:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:36:37.745	2025-04-22 18:36:37.745
cm9sujt8j003wtzfgirvrnnyb	calon-isteri-buat-suami-full-episod-11	Calon Isteri Buat Suami - Full Episod 11	11	/videos/calon-isteri-buat-suami-11.m3u8	2025-04-21 03:16:00	cm9sufq0f0030tzfgo6oyc6xg	2025-04-22 18:36:56.899	2025-04-22 18:36:56.899
cm9suk94c003ztzfgwctib7sb	dendam-seorang-madu-full-episod-1	Dendam Seorang Madu - Full Episod 1	1	/videos/dendam-seorang-madu-1.m3u8	2025-02-28 02:37:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:37:17.484	2025-04-22 18:37:17.484
cm9sukni80042tzfgdhorlpi7	dendam-seorang-madu-full-episod-2	Dendam Seorang Madu - Full Episod 2	2	/videos/dendam-seorang-madu-2.m3u8	2025-03-02 05:24:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:37:36.128	2025-04-22 18:37:36.128
cm9sul2tg0045tzfgjg4d8vo2	dendam-seorang-madu-full-episod-3	Dendam Seorang Madu - Full Episod 3	3	/videos/dendam-seorang-madu-3.m3u8	2025-03-03 04:16:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:37:55.972	2025-04-22 18:37:55.972
cm9sulgxm0048tzfgi6vpo94q	dendam-seorang-madu-full-episod-4	Dendam Seorang Madu - Full Episod 4	4	/videos/dendam-seorang-madu-4.m3u8	2025-03-04 00:59:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:38:14.266	2025-04-22 18:38:14.266
cm9sulvka004btzfg0sh4ff7f	dendam-seorang-madu-full-episod-5	Dendam Seorang Madu - Full Episod 5	5	/videos/dendam-seorang-madu-5.m3u8	2025-03-05 01:26:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:38:33.226	2025-04-22 18:38:33.226
cm9sum940004etzfgb8pk3v89	dendam-seorang-madu-full-episod-6	Dendam Seorang Madu - Full Episod 6	6	/videos/dendam-seorang-madu-6.m3u8	2025-03-07 02:11:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:38:50.785	2025-04-22 18:38:50.785
cm9sumnpn004htzfgd9du9ng3	dendam-seorang-madu-full-episod-7	Dendam Seorang Madu - Full Episod 7	7	/videos/dendam-seorang-madu-7.m3u8	2025-03-10 00:16:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:39:09.707	2025-04-22 18:39:09.707
cm9sun1li004ktzfg9zdo0ql5	dendam-seorang-madu-full-episod-8	Dendam Seorang Madu - Full Episod 8	8	/videos/dendam-seorang-madu-8.m3u8	2025-03-11 01:49:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:39:27.702	2025-04-22 18:39:27.702
cm9sunfa9004ntzfg3h6czrop	dendam-seorang-madu-full-episod-9	Dendam Seorang Madu - Full Episod 9	9	/videos/dendam-seorang-madu-9.m3u8	2025-03-12 02:36:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:39:45.441	2025-04-22 18:39:45.441
cm9sunulq004qtzfgfqk07bce	dendam-seorang-madu-full-episod-10	Dendam Seorang Madu - Full Episod 10	10	/videos/dendam-seorang-madu-10.m3u8	2025-03-13 02:45:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:40:05.295	2025-04-22 18:40:05.295
cm9suo904004ttzfgimaui8nh	dendam-seorang-madu-full-episod-11	Dendam Seorang Madu - Full Episod 11	11	/videos/dendam-seorang-madu-11.m3u8	2025-03-14 01:46:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:40:23.956	2025-04-22 18:40:23.956
cm9suolrp004wtzfgtmb41s2y	dendam-seorang-madu-full-episod-12	Dendam Seorang Madu - Full Episod 12	12	/videos/dendam-seorang-madu-12.m3u8	2025-03-16 01:21:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:40:40.501	2025-04-22 18:40:40.501
cm9sup16s004ztzfg94g6tgg5	dendam-seorang-madu-full-episod-13	Dendam Seorang Madu - Full Episod 13	13	/videos/dendam-seorang-madu-13.m3u8	2025-03-17 00:54:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:41:00.484	2025-04-22 18:41:00.484
cm9supfkf0052tzfgcoxygm5g	dendam-seorang-madu-full-episod-14	Dendam Seorang Madu - Full Episod 14	14	/videos/dendam-seorang-madu-14.m3u8	2025-03-18 00:59:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:41:19.12	2025-04-22 18:41:19.12
cm9sups7e0055tzfgyvr9uevb	dendam-seorang-madu-full-episod-15	Dendam Seorang Madu - Full Episod 15	15	/videos/dendam-seorang-madu-15.m3u8	2025-03-19 04:45:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:41:35.498	2025-04-22 18:41:35.498
cm9suq6zb0058tzfgguc23rv6	dendam-seorang-madu-full-episod-16	Dendam Seorang Madu - Full Episod 16	16	/videos/dendam-seorang-madu-16.m3u8	2025-03-20 15:24:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:41:54.647	2025-04-22 18:41:54.647
cm9suqkrs005btzfgtjjpl7qh	dendam-seorang-madu-full-episod-17	Dendam Seorang Madu - Full Episod 17	17	/videos/dendam-seorang-madu-17.m3u8	2025-03-23 01:18:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:42:12.52	2025-04-22 18:42:12.52
cm9suqyjm005etzfguugzmvvt	dendam-seorang-madu-full-episod-18	Dendam Seorang Madu - Full Episod 18	18	/videos/dendam-seorang-madu-18.m3u8	2025-03-24 00:27:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:42:30.371	2025-04-22 18:42:30.371
cm9surd8b005htzfgl5blc0oi	dendam-seorang-madu-full-episod-19	Dendam Seorang Madu - Full Episod 19	19	/videos/dendam-seorang-madu-19.m3u8	2025-03-25 01:01:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:42:49.404	2025-04-22 18:42:49.404
cm9surrqv005ktzfg1aefvhad	dendam-seorang-madu-full-episod-20	Dendam Seorang Madu - Full Episod 20	20	/videos/dendam-seorang-madu-20.m3u8	2025-03-26 00:55:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:43:08.215	2025-04-22 18:43:08.215
cm9sus5f9005ntzfgdu3t2adj	dendam-seorang-madu-full-episod-21	Dendam Seorang Madu - Full Episod 21	21	/videos/dendam-seorang-madu-21.m3u8	2025-03-29 10:56:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:43:25.941	2025-04-22 18:43:25.941
cm9susjos005qtzfgmam1xp3z	dendam-seorang-madu-full-episod-22	Dendam Seorang Madu - Full Episod 22	22	/videos/dendam-seorang-madu-22.m3u8	2025-03-30 07:10:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:43:44.429	2025-04-22 18:43:44.429
cm9susz1k005ttzfgvog8fisz	dendam-seorang-madu-full-episod-23	Dendam Seorang Madu - Full Episod 23	23	/videos/dendam-seorang-madu-23.m3u8	2025-03-31 13:00:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:44:04.328	2025-04-22 18:44:04.328
cm9sutdbz005wtzfgx3de9ey8	dendam-seorang-madu-full-episod-24	Dendam Seorang Madu - Full Episod 24	24	/videos/dendam-seorang-madu-24.m3u8	2025-04-01 02:58:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:44:22.847	2025-04-22 18:44:22.847
cm9sutt0k005ztzfgtfkg0v9p	dendam-seorang-madu-full-episod-25	Dendam Seorang Madu - Full Episod 25	25	/videos/dendam-seorang-madu-25.m3u8	2025-04-02 01:16:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:44:43.172	2025-04-22 18:44:43.172
cm9suu8d20062tzfgfsjzrmid	dendam-seorang-madu-full-episod-26	Dendam Seorang Madu - Full Episod 26	26	/videos/dendam-seorang-madu-26.m3u8	2025-04-06 06:35:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:45:03.062	2025-04-22 18:45:03.062
cm9suujy40065tzfgonm6ky6o	dendam-seorang-madu-full-episod-27	Dendam Seorang Madu - Full Episod 27	27	/videos/dendam-seorang-madu-27.m3u8	2025-04-07 06:49:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:45:18.076	2025-04-22 18:45:18.076
cm9suv8p50069tzfgg60l6iv5	dendam-seorang-madu-full-episod-29	Dendam Seorang Madu - Full Episod 29	29	/videos/dendam-seorang-madu-29.m3u8	2025-04-09 02:54:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:45:50.153	2025-04-22 18:45:50.153
cm9suvnkr006ctzfg9w9y1zh2	dendam-seorang-madu-full-episod-30	Dendam Seorang Madu - Full Episod 30	30	/videos/dendam-seorang-madu-30.m3u8	2025-04-10 03:50:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:46:09.435	2025-04-22 18:46:09.435
cm9suw2nm006ftzfgrr04zyiq	dendam-seorang-madu-full-episod-31	Dendam Seorang Madu - Full Episod 31	31	/videos/dendam-seorang-madu-31.m3u8	2025-04-11 02:46:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:46:28.978	2025-04-22 18:46:28.978
cm9suwhcj006itzfgxqtci3k1	dendam-seorang-madu-full-episod-32	Dendam Seorang Madu - Full Episod 32	32	/videos/dendam-seorang-madu-32.m3u8	2025-04-13 03:33:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:46:48.019	2025-04-22 18:46:48.019
cm9suwvjc006ltzfgyq47meao	dendam-seorang-madu-full-episod-33	Dendam Seorang Madu - Full Episod 33	33	/videos/dendam-seorang-madu-33.m3u8	2025-04-14 06:15:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:47:06.408	2025-04-22 18:47:06.408
cm9sux9ig006otzfgct77prp8	dendam-seorang-madu-full-episod-34	Dendam Seorang Madu - Full Episod 34	34	/videos/dendam-seorang-madu-34.m3u8	2025-04-15 01:05:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:47:24.52	2025-04-22 18:47:24.52
cm9suxmx6006rtzfgpcyxk3f2	dendam-seorang-madu-full-episod-35	Dendam Seorang Madu - Full Episod 35	35	/videos/dendam-seorang-madu-35.m3u8	2025-04-16 05:06:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:47:41.899	2025-04-22 18:47:41.899
cm9suy12s006utzfg046zdsik	dendam-seorang-madu-full-episod-36	Dendam Seorang Madu - Full Episod 36	36	/videos/dendam-seorang-madu-36.m3u8	2025-04-20 00:31:00	cm9suk946003xtzfg11q683rz	2025-04-22 18:48:00.244	2025-04-22 18:48:00.244
cm9suyg0r006xtzfgqsu3r2n2	keluarga-itu-full-episod-1	Keluarga Itu - Full Episod 1	1	/videos/keluarga-itu-1.m3u8	2025-02-26 00:12:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:48:19.611	2025-04-22 18:48:19.611
cm9suyukc0070tzfgw1esyn9p	keluarga-itu-full-episod-2	Keluarga Itu - Full EPisod 2	2	/videos/keluarga-itu-2.m3u8	2025-02-27 05:33:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:48:38.46	2025-04-22 18:48:38.46
cm9suz9n30073tzfgkebz50tb	keluarga-itu-full-episod-3	Keluarga Itu - Full Episod 3	3	/videos/keluarga-itu-3.m3u8	2025-02-28 02:35:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:48:58	2025-04-22 18:48:58
cm9suzjp30076tzfgqwkqpvpy	keluarga-itu-full-episod-4	Keluarga Itu - Full Episod 4	4	/videos/keluarga-itu-4.m3u8	2025-03-05 01:28:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:49:11.031	2025-04-22 18:49:11.031
cm9suzzdf0079tzfg0oqrim04	keluarga-itu-full-episod-5	Keluarga Itu - Full Episod 5	5	/videos/keluarga-itu-5.m3u8	2025-03-06 15:07:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:49:31.348	2025-04-22 18:49:31.348
cm9sv0e4n007ctzfgm6yuujmk	keluarga-itu-full-episod-6	Keluarga Itu - Full Episod 6	6	/videos/keluarga-itu-6.m3u8	2025-03-07 01:59:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:49:50.472	2025-04-22 18:49:50.472
cm9sv0t0s007ftzfguflgc7xu	keluarga-itu-full-episod-7	Keluarga Itu - Full Episod 7	7	/videos/keluarga-itu-7.m3u8	2025-03-12 03:03:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:50:09.773	2025-04-22 18:50:09.773
cm9sv13kn007itzfglyut4bdj	keluarga-itu-full-episod-8	Keluarga Itu - Full Episod 8	8	/videos/keluarga-itu-8.m3u8	2025-03-13 02:47:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:50:23.447	2025-04-22 18:50:23.447
cm9sv1i49007ltzfguedwoqjp	keluarga-itu-full-episod-9	Keluarga Itu - Full Episod 9	9	/videos/keluarga-itu-9.m3u8	2025-03-14 01:40:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:50:42.297	2025-04-22 18:50:42.297
cm9sv1xmq007otzfgy7pk5bgn	keluarga-itu-full-episod-10	Keluarga Itu - Full Episod 10	10	/videos/keluarga-itu-10.m3u8	2025-03-17 01:03:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:51:02.402	2025-04-22 18:51:02.402
cm9sv2cfv007rtzfgveuhwnr9	keluarga-itu-full-episod-11	Keluarga Itu - Full Episod 11	11	/videos/keluarga-itu-11.m3u8	2025-03-19 04:46:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:51:21.595	2025-04-22 18:51:21.595
cm9sv2qn0007utzfg95wpy46q	keluarga-itu-full-episod-12	Keluarga Itu - Full Episod 12	12	/videos/keluarga-itu-12.m3u8	2025-03-20 01:47:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:51:39.996	2025-04-22 18:51:39.996
cm9sv32du007xtzfgz2l63u30	keluarga-itu-full-episod-13	Keluarga Itu - Full Episod 13	13	/videos/keluarga-itu-13.m3u8	2025-03-24 00:35:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:51:55.218	2025-04-22 18:51:55.218
cm9sv3g8o0080tzfg7vf7mfgg	keluarga-itu-full-episod-14	Keluarga Itu - Full Episod 14	14	/videos/keluarga-itu-14.m3u8	2025-03-25 01:11:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:52:13.176	2025-04-22 18:52:13.176
cm9sv3vn40083tzfgb25078xj	keluarga-itu-full-episod-15	Keluarga Itu - Full Episod 15	15	/videos/keluarga-itu-15.m3u8	2025-03-26 00:59:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:52:33.137	2025-04-22 18:52:33.137
cm9sv4ae10086tzfgpbv3srnc	keluarga-itu-full-episod-16	Keluarga Itu - Full Episod 16	16	/videos/keluarga-itu-16.m3u8	2025-04-01 02:59:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:52:52.249	2025-04-22 18:52:52.249
cm9sv4mav0089tzfg6rxz25dg	keluarga-itu-full-episod-17	Keluarga Itu - Full Episod 17	17	/videos/keluarga-itu-17.m3u8	2025-04-02 01:17:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:53:07.688	2025-04-22 18:53:07.688
cm9sv4zbg008ctzfgjaefmqfm	keluarga-itu-full-episod-18	Keluarga Itu - Full Episod 18	18	/videos/keluarga-itu-18.m3u8	2025-04-04 01:59:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:53:24.556	2025-04-22 18:53:24.556
cm9sv5d4n008ftzfgge181xhx	keluarga-itu-full-episod-19	Keluarga Itu - Full Episod 19	19	/videos/keluarga-itu-19.m3u8	2025-04-09 03:00:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:53:42.455	2025-04-22 18:53:42.455
cm9sv5r6z008itzfg0vt34kck	keluarga-itu-full-episod-20	Keluarga Itu - Full Episod 20	20	/videos/keluarga-itu-20.m3u8	2025-04-11 01:07:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:54:00.684	2025-04-22 18:54:00.684
cm9sv65ac008ltzfggp88fvee	keluarga-itu-full-episod-21	Keluarga Itu - Full Episod 21	21	/videos/keluarga-itu-21.m3u8	2025-04-10 03:51:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:54:18.948	2025-04-22 18:54:18.948
cm9sv6j43008otzfga1hqcr8n	keluarga-itu-full-episod-22	Keluarga Itu - Full Episod 22	22	/videos/keluarga-itu-22.m3u8	2025-04-15 01:06:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:54:36.867	2025-04-22 18:54:36.867
cm9sv6xc5008rtzfg75473phs	keluarga-itu-full-episod-23	Keluarga Itu - Full Episod 23	23	/videos/keluarga-itu-23.m3u8	2025-04-16 05:06:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:54:55.301	2025-04-22 18:54:55.301
cm9sv7cgm008utzfg59ytq95v	keluarga-itu-full-episod-24	Keluarga Itu - Full Episod 24	24	/videos/keluarga-itu-24.m3u8	2025-04-17 06:44:00	cm9suyg0l006vtzfgnih62fy0	2025-04-22 18:55:14.902	2025-04-22 18:55:14.902
cm9sv7ret008xtzfgixfjt12d	sekam-di-dada-full-episod-1	Sekam Di Dada - Full Episod 1	1	/videos/sekam-di-dada-1.m3u8	2025-03-10 00:17:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:55:34.277	2025-04-22 18:55:34.277
cm9sv83t30090tzfgy15swjsj	sekam-di-dada-full-episod-2	Sekam Di Dada - Full Episod 2	2	/videos/sekam-di-dada-2.m3u8	2025-03-11 01:50:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:55:50.344	2025-04-22 18:55:50.344
cm9sv8ic60093tzfgmn5kh14m	sekam-di-dada-full-episod-3	Sekam Di Dada - Full Episod 3	3	/videos/sekam-di-dada-3.m3u8	2025-03-12 02:38:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:56:09.175	2025-04-22 18:56:09.175
cm9sv8wec0096tzfgkxjqlghf	sekam-di-dada-full-episod-4	Sekam Di Dada - Full Episod 4	4	/videos/sekam-di-dada-4.m3u8	2025-03-14 01:47:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:56:27.396	2025-04-22 18:56:27.396
cm9sv9ahk0099tzfgr1bjh6nq	sekam-di-dada-full-episod-5	Sekam Di Dada - Full Episod 5	5	/videos/sekam-di-dada-5.m3u8	2025-03-16 01:22:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:56:45.656	2025-04-22 18:56:45.656
cm9sv9op1009ctzfgeigcvfm9	sekam-di-dada-full-episod-6	Sekam Di Dada - Full Episod 6	6	/videos/sekam-di-dada-6.m3u8	2025-03-17 00:58:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:57:04.069	2025-04-22 18:57:04.069
cm9sva3b2009ftzfgk579mh01	sekam-di-dada-full-episod-7	Sekam Di Dada - Full Episod 7	7	/videos/sekam-di-dada-7.m3u8	2025-03-18 01:00:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:57:23.007	2025-04-22 18:57:23.007
cm9svahu3009itzfgup9lzq7p	sekam-di-dada-full-episod-8	Sekam Di Dada - Full Episod 8	8	/videos/sekam-di-dada-8.m3u8	2025-03-19 04:45:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:57:41.835	2025-04-22 18:57:41.835
cm9svaxi9009ltzfgdeo19n4x	sekam-di-dada-full-episod-9	Sekam Di Dada - Full Episod 9	9	/videos/sekam-di-dada-9.m3u8	2025-03-20 15:30:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:58:02.145	2025-04-22 18:58:02.145
cm9svbbkd009otzfgoiwmezu8	sekam-di-dada-full-episod-10	Sekam Di Dada - Full Episod 10	10	/videos/sekam-di-dada-10.m3u8	2025-03-23 01:33:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:58:20.365	2025-04-22 18:58:20.365
cm9svbqlp009rtzfg8m2khfjo	sekam-di-dada-full-episod-11	Sekam Di Dada - Full Episod 11	11	/videos/sekam-di-dada-11.m3u8	2025-03-24 00:29:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:58:39.854	2025-04-22 18:58:39.854
cm9svc4g7009utzfg3y9a93vt	sekam-di-dada-full-episod-12	Sekam Di Dada - Full Episod 12	12	/videos/sekam-di-dada-12.m3u8	2025-03-25 01:08:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:58:57.799	2025-04-22 18:58:57.799
cm9svchjb009xtzfgltkpk5ms	sekam-di-dada-full-episod-13	Sekam Di Dada - Full Episod 13	13	/videos/sekam-di-dada-13.m3u8	2025-03-26 00:56:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:59:14.759	2025-04-22 18:59:14.759
cm9svcvyh00a0tzfg8oujh1k7	sekam-di-dada-full-episod-14	Sekam Di Dada - Full Episod 14	14	/videos/sekam-di-dada-14.m3u8	2025-03-29 10:59:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:59:33.449	2025-04-22 18:59:33.449
cm9svd9oy00a3tzfgqt338sdt	sekam-di-dada-full-episod-15	Sekam Di Dada - Full Episod 15	15	/videos/sekam-di-dada-15.m3u8	2025-03-31 12:58:00	cm9sudclc002itzfg73dqjnek	2025-04-22 18:59:51.25	2025-04-22 18:59:51.25
cm9svdogo00a6tzfg9384npy9	sekam-di-dada-full-episod-16	Sekam Di Dada - Full Episod 16	16	/videos/sekam-di-dada-16.m3u8	2025-04-02 01:32:00	cm9sudclc002itzfg73dqjnek	2025-04-22 19:00:10.393	2025-04-22 19:00:10.393
cm9sve12600a9tzfge14bm80e	sekam-di-dada-full-episod-17	Sekam Di Dada - Full Episod 17	17	/videos/sekam-di-dada-17.m3u8	2025-04-06 06:37:00	cm9sudclc002itzfg73dqjnek	2025-04-22 19:00:26.719	2025-04-22 19:00:26.719
cm9svef8i00actzfgyd3d3x5b	sekam-di-dada-full-episod-18	Sekam Di Dada - Full Episod 18	18	/videos/sekam-di-dada-18.m3u8	2025-04-07 06:58:00	cm9sudclc002itzfg73dqjnek	2025-04-22 19:00:45.09	2025-04-22 19:00:45.09
cm9svesrn00aftzfg9bk07u7i	sekam-di-dada-full-episod-19	Sekam Di Dada - Full Episod 19	19	/videos/sekam-di-dada-19.m3u8	2025-04-08 06:13:00	cm9sudclc002itzfg73dqjnek	2025-04-22 19:01:02.627	2025-04-22 19:01:02.627
cm9svf6gq00aitzfgtnuyxrnd	sekam-di-dada-full-episod-20-akhir	Sekam Di Dada - Full Episod 20 AKHIR	20	/videos/sekam-di-dada-20.m3u8	2025-04-09 02:56:00	cm9sudclc002itzfg73dqjnek	2025-04-22 19:01:20.379	2025-04-22 19:01:20.379
cm9t2faj600altzfgyjkc8h6q	dia-imamku-full-episod-11	Dia Imamku - Full Episod 11	11	/videos/dia-imamku-11.m3u8	2025-03-03 06:02:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:17:22.962	2025-04-22 22:17:22.962
cm9t2ge0000aotzfgc5p1mj67	dia-imamku-full-episod-12	Dia Imamku - Full Episod 12	12	/videos/dia-imamku-12.m3u8	2025-03-04 01:03:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:18:14.113	2025-04-22 22:18:14.113
cm9t2hexw00artzfgs1y70yr3	dia-imamku-full-episod-14	Dia Imamku - Full Episod 14	14	/videos/dia-imamku-14.m3u8	2025-03-10 00:18:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:19:01.988	2025-04-22 22:19:01.988
cm9t2i4ek00autzfg3zovncgf	dia-imamku-full-episod-16	Dia Imamku - Full Episod 16	16	/videos/dia-imamku-16.m3u8	2025-03-12 03:02:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:19:34.988	2025-04-22 22:19:34.988
cm9t2j1cz00axtzfg84emc8g7	dia-imamku-full-episod-17	Dia Imamku - Full Episod 17	17	/videos/dia-imamku-17.m3u8	2025-03-14 01:51:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:20:17.7	2025-04-22 22:20:17.7
cm9t2kr0y00b0tzfgq5s0mdq4	dia-imamku-full-episod-19	Dia Imamku - Full Episod 19	19	/videos/dia-imamku-19.m3u8	2025-03-17 01:00:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:21:37.618	2025-04-22 22:21:37.618
cm9t2mo3400b3tzfgtv4xsya9	dia-imamku-full-episod-20	Dia Imamku - Full Episod 20	20	/videos/dia-imamku-20.m3u8	2025-03-18 01:02:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:23:07.121	2025-04-22 22:23:07.121
cm9t2o21f00b6tzfgijyft51w	dia-imamku-full-episod-21	Dia Imamku - Full Episod 21	21	/videos/dia-imamku-21.m3u8	2025-03-20 15:25:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:24:11.859	2025-04-22 22:24:11.859
cm9t2p0r500b9tzfgabiqjoqm	dia-imamku-full-episod-22	Dia Imamku - Full Episod 22	22	/videos/dia-imamku-22.m3u8	2025-03-23 01:34:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:24:56.849	2025-04-22 22:24:56.849
cm9t2q17i00bctzfgbu7bmp07	dia-imamku-full-episod-23	Dia Imamku - Full Episod 23	23	/videos/dia-imamku-23.m3u8	2025-03-24 00:34:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:25:44.094	2025-04-22 22:25:44.094
cm9t2qtmc00bftzfgtdzibw3c	dia-imamku-full-episod-24	Dia Imamku - Full Episod 24	24	/videos/dia-imamku-24.m3u8	2025-03-25 01:09:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:26:20.916	2025-04-22 22:26:20.916
cm9t2rttl00bitzfg48n5b9rf	dia-imamku-full-episod-25	Dia Imamku - Full Episod 25	25	/videos/dia-imamku-25.m3u8	2025-03-29 10:57:00	cm9sjl7is0000tzc445szhdo6	2025-04-22 22:27:07.834	2025-04-22 22:27:07.834
\.


--
-- TOC entry 4797 (class 0 OID 18642)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e0f20ae7-7860-4090-a219-4b2ea9d0ef71	9b0fc8e7d60052b747c421719e027122cad49b84b9198a9d0c93ff0817a9c23e	2025-04-21 11:52:30.215838+07	20250421045229_init	\N	\N	2025-04-21 11:52:30.120026+07	1
\.


--
-- TOC entry 4648 (class 2606 OID 18662)
-- Name: Drama Drama_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Drama"
    ADD CONSTRAINT "Drama_pkey" PRIMARY KEY (id);


--
-- TOC entry 4651 (class 2606 OID 18670)
-- Name: Episode Episode_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Episode"
    ADD CONSTRAINT "Episode_pkey" PRIMARY KEY (id);


--
-- TOC entry 4646 (class 2606 OID 18650)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4649 (class 1259 OID 18671)
-- Name: Drama_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Drama_slug_key" ON public."Drama" USING btree (slug);


--
-- TOC entry 4652 (class 1259 OID 18672)
-- Name: Episode_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Episode_slug_key" ON public."Episode" USING btree (slug);


--
-- TOC entry 4653 (class 2606 OID 18673)
-- Name: Episode Episode_dramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Episode"
    ADD CONSTRAINT "Episode_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES public."Drama"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4806 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-04-23 09:47:11

--
-- PostgreSQL database dump complete
--

