import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import axios from "axios";

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<
    "init" | "askCity" | "done" | "noResponse" | "chatMode"
  >("init");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContinueChat, setShowContinueChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([
      { from: "bot", text: "Want nearby locations of Neurosurgeons?" },
    ]);
  }, []);

  const handleYes = () => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: "Yes" },
      { from: "bot", text: "Please enter your city." },
    ]);
    setStage("askCity");
    setShowContinueChat(false);
  };

  const handleNo = () => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: "No" },
      { from: "bot", text: "Okay, let me know if you change your mind." },
    ]);
    setStage("noResponse");
    setShowContinueChat(true);
  };

  const handleAskLocation = () => {
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "Please enter your city." },
    ]);
    setStage("askCity");
    setShowContinueChat(false);
  };

  const handleStartFreeChat = () => {
    setStage("chatMode");
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "You can now ask me anything." },
    ]);
  };

  const handleCitySubmit = () => {
    if (!city.trim()) return;
    const link = `https://www.practo.com/search/doctors?results_type=doctor&q=%5B%7B%22word%22%3A%22neurosurgeon%22%2C%22autocompleted%22%3Atrue%2C%22category%22%3A%22subspeciality%22%7D%5D&city=${encodeURIComponent(
      city
    )}`;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: city },
      { from: "bot", text: `Here is a link to nearby neurosurgeons:` },
      {
        from: "bot",
        text: `<a href="${link}" target="_blank" rel="noopener noreferrer">Go to see nearby Neurosurgeons in ${city}</a>`,
      },
    ]);
    setCity("");
    setStage("done");
    setShowContinueChat(true);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const query = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: query }]);
    setLoading(true);

    const keywords: string[] = [
      "hi",
      "hello",
      "explain",
      "details",
      "name",
      "describe",
      "tell",
      "me",
      "what do you do?",
      "research",
      "brain",
      "mortality",
      "risk",
      "symptoms",
      "brain tumor",
      "glioblastoma",
      "mri",
      "surgery",
      "radiation",
      "tumor",
      "brain cancer",
      "treatment",
      "biopsy",
      "doctor",
      "neurosurgeon",
      "for",
      "neurosurgery",
      "neurosurgeons",
      "grading",
      "elaborate",
      "understand",
      "other symptoms",
      "brain tumour",
      "mass",
      "lesion",
      "astrocytoma",
      "oligodendroglioma",
      "meningioma",
      "ependymoma",
      "medulloblastoma",
      "schwannoma",
      "craniopharyngioma",
      "pituitary",
      "pituitary adenoma",
      "choroid plexus tumor",
      "pineoblastoma",
      "glioma",
      "metastatic tumor",
      "ct",
      "pet",
      "segmentation",
      "neuroimaging",
      "imaging",
      "scan",
      "contrast enhancement",
      "diffusion",
      "get",
      "getting",
      "information",
      "nutrition",
      "histology",
      "pathology",
      "thank you",
      "thanks",
      "u",
      "anything",
      "about",
      "what",
      "when",
      "where",
      "who",
      "whom",
      "whose",
      "why",
      "which",
      "how",
      "is",
      "are",
      "am",
      "was",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "can",
      "could",
      "may",
      "might",
      "must",
      "shall",
      "should",
      "get",
      "areas",
      "type",
      "types",
      "i",
      "me",
      "myself",
      "my",
      "self",
      "you",
      "them",
      "there",
      "their",
      "spread",
      "gets",
      "getting",
      "got",
      "go",
      "goes",
      "going",
      "went",
      "know",
      "knows",
      "knowing",
      "knew",
      "find",
      "finds",
      "finding",
      "found",
      "tell",
      "tells",
      "telling",
      "told",
      "ask",
      "asks",
      "asking",
      "asked",
      "explain",
      "explains",
      "explaining",
      "explained",
      "understand",
      "understands",
      "understanding",
      "understood",
      "research",
      "researches",
      "researching",
      "researched",
      "detect",
      "detects",
      "detecting",
      "detected",
      "big",
      "small",
      "large",
      "larger",
      "smaller",
      "pituitary",
      "adenoma",
      "pain",
      "pitutary",
      "operation",
      "eat",
      "routine",
      "sleep",
      "schedule",
      "relief",
      "life",
      "lives",
      "lifestyle",
      "or",
      "and",
      "with",
      "belong",
      "therapy",
      "manage",
      "analysis",
      "therapies",
      "the",
      "diagnose",
      "diagnoses",
      "diagnosed",
      "diagnosing",
      "treat",
      "treats",
      "treating",
      "treated",
      "cause",
      "causes",
      "causing",
      "caused",
      "show",
      "shows",
      "showing",
      "showed",
      "provide",
      "provides",
      "providing",
      "provided",
      "describe",
      "describes",
      "describing",
      "described",
      "help",
      "helps",
      "helping",
      "helped",
      "manage",
      "manages",
      "managing",
      "managed",
      "develop",
      "develops",
      "developing",
      "developed",
      "identify",
      "identifies",
      "identifying",
      "identified",
      "reduce",
      "reduces",
      "reducing",
      "reduced",
      "increase",
      "increases",
      "increasing",
      "increased",
      "affect",
      "affects",
      "affecting",
      "affected",
      "impact",
      "impacts",
      "impacting",
      "impacted",
      "prevent",
      "prevents",
      "preventing",
      "prevented",
      "progress",
      "progresses",
      "progressing",
      "progressed",
      "recur",
      "recurs",
      "recurring",
      "recurred",
      "monitor",
      "monitors",
      "monitoring",
      "monitored",
      "predict",
      "predicts",
      "predicting",
      "predicted",
      "observe",
      "observes",
      "observing",
      "observed",
      "compare",
      "compares",
      "comparing",
      "compared",
      "differentiate",
      "differentiates",
      "differentiating",
      "differentiated",
      "recommend",
      "recommends",
      "recommending",
      "recommended",
      "evaluate",
      "evaluates",
      "evaluating",
      "evaluated",
      "assess",
      "assesses",
      "assessing",
      "assessed",
      "determine",
      "determines",
      "determining",
      "determined",
      "explore",
      "explores",
      "exploring",
      "explored",
      "discover",
      "discovers",
      "discovering",
      "discovered",
      "consider",
      "considers",
      "considering",
      "considered",
      "analyze",
      "analyzes",
      "analyzing",
      "analyzed",
      "interpret",
      "interprets",
      "interpreting",
      "interpreted",
      "classify",
      "classifies",
      "classifying",
      "classified",
      "segment",
      "segments",
      "segmenting",
      "segmented",
      "perform",
      "performs",
      "performing",
      "performed",
      "undergo",
      "undergoes",
      "research",

      "undergoing",
      "underwent",
      "experience",
      "experiences",
      "experiencing",
      "experienced",
      "present",
      "presents",
      "presenting",
      "presented",
      "feel",
      "feels",
      "feeling",
      "felt",
      "see",
      "sees",
      "seeing",
      "saw",
      "hear",
      "hears",
      "hearing",
      "heard",
      "lose",
      "loses",
      "losing",
      "lost",
      "affect",
      "affects",
      "affecting",
      "affected",
      "cause",
      "causes",
      "causing",
      "caused",
      "treatment",
      "knowledge",
      "understanding",
      "learn",
      "details",
      "stage",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "hair",
      "example",
      "examples",
      "case",
      "cases",
      "flair",
      "t1",
      "t2",
      "adc",
      "perfusion",
      "edema",
      "histopathology",
      "classification",
      "segmentation",
      "radiomics",
      "headache",
      "nausea",
      "vomiting",
      "?",
      ".",
      "who",
      "how",
      "when",
      "does",
      "do",
      "can you",
      "can you explain",
      "did",
      "treat",
      "treated",
      "what",
      "where",
      "location",
      "cancerous",
      "gliomas",
      "common",
      "slow",
      "nerve",
      "symptom",
      "symptoms",
      "benign",
      "medical",
      "health",
      "patient",
      "patients",

      "malignant",
      "ct",
      "scan",
      "scans",
      "type",
      "size",
      "was",
      "were",
      "is",
      "are",
      "what is",
      "what are",
      "what was",

      "can",
      "could",
      "may",
      "might",
      "should",
      "will",
      "must",
      "diagnosis",
      "diagnosed",
      "diagnose",
      "diagnostic",
      "biopsy",
      "tumour",
      "tumours",
      "tumor",
      "tumors",
      "headache",
      "nausea",
      "vomiting",
      "blurred vision",
      "double vision",
      "seizure",
      "memory loss",
      "confusion",
      "balance issues",
      "speech difficulty",
      "cognitive decline",
      "personality change",
      "motor dysfunction",
      "weakness",
      "numbness",
      "coordination",
      "hearing loss",
      "vision problems",
      "surgery",
      "neurosurgery",
      "craniotomy",
      "radiotherapy",
      "radiation",
      "chemotherapy",
      "temozolomide",
      "bevacizumab",
      "targeted therapy",
      "immunotherapy",
      "gamma knife",
      "proton therapy",
      "tumor treating fields",
      "palliative care",
      "steroids",
      "dexamethasone",
      "rehabilitation",
      "bye",
      "goodbye",
      "good bye",
      "bad",
      "good",
      "did",
      "happen",
      "surgery",
      "radiation",
      "therapy",
      "detect",
      "detected",
      "blurred vision",
      "double vision",
      "seizure",
      "memory loss",
      "confusion",
      "balance issues",
      "speech difficulty",
      "cognitive decline",
      "personality change",
      "motor dysfunction",
      "neurosurgery",
      "craniotomy",
      "radiotherapy",
      "chemotherapy",
      "temozolomide",
      "bevacizumab",
      "targeted therapy",
      "immunotherapy",
      "gamma knife",
      "proton therapy",
      "tumor treating fields",
      "palliative care",
      "recurrence",
      "tumor progression",
      "surveillance",
      "follow-up",
      "clinical trials",
      "karnofsky score",
      "neurological exam",
      "steroids",
      "dexamethasone",
      "neuro-oncology",
      "oncology",
      "neurology",
      "neuroscience",
      "neurosurgeon",
      "cns tumor",
      "central nervous system",
      "malignant",
      "benign",
      "idh mutation",
      "mgmt methylation",
      "1p/19q co-deletion",
      "egfr",
      "tp53",
      "atrx",
      "molecular markers",
      "biomarkers",
      "genomic profiling",
      "gliosis",
      "necrosis",
      "proliferation index",
      "ki-67",
      "braf mutation",
      "h3k27m mutation",
      "tert promoter mutation",
      "next-gen sequencing",
      "oncogene",
      "tumor suppressor",
      "frontal lobe",
      "temporal lobe",
      "parietal lobe",
      "occipital lobe",
      "cerebellum",
      "brainstem",
      "pituitary gland",
      "pineal gland",
      "ventricles",
      "corpus callosum",
      "radiation planning",
      "brain mapping",
      "stereotactic surgery",
      "neuronavigation",
      "intraoperative mri",
      "biomarker testing",
      "tumor board",
      "clinical pathway",
      "spectroscopy",
      "functional mri",
      "tractography",
      "susceptibility weighted imaging",
      "mrs",
      "neuropsychology",
      "rehabilitation",
      "causes",
      "risk factors",
      "genetics",
      "environmental factors",
      "lifestyle factors",
      "family history",
      "radiation exposure",
      "infiltration",
      "cause",
      "the",
      "mass effect",
      "midline shift",
      "occupational therapy",
      "speech therapy",
      "cognitive rehab",
      "psychosocial support",
      "neuropsychological evaluation",
      "palliative team",
      "fatigue management",
      "phase 1 trial",
      "placebo controlled",
      "double blind",
      "overall survival",
      "progression free survival",
      "tumor registry",
      "cohort study",
      "immunotherapy pipeline",
      "hi",
      "hello",
      "hey",
      "can you help",
      "i need help",
      "tell me",
      "i want to know",
      "question",
      "questions",
      "what is",
      "how does",
      "why does",
      "when does",
      "where is",
      "who is",
      "my head",
      "my brain",
      "my health",
      "body",
      "feeling",
      "feel",
      "sick",
      "bad",
      "worried",
      "scared",
      "concerned",
      "problem",
      "issues",
      "something wrong",
      "normal",
      "abnormal",
      "brain tumor",
      "brain tumour",
      "brain cancer",
      "tumor",
      "cancer",
      "lump",
      "growth",
      "mass",
      "spot",
      "cell",
      "cells",
      "disease",
      "headache",
      "headaches",
      "pain in head",
      "bad headache",
      "dizzy",
      "dizziness",
      "sick to my stomach",
      "nausea",
      "throwing up",
      "vomiting",
      "tired",
      "fatigue",
      "sleepy",
      "weak",
      "weakness",
      "can't see",
      "blurry vision",
      "double vision",
      "eyesight",
      "seeing things",
      "seizure",
      "fits",
      "black out",
      "memory",
      "forgetting things",
      "confusion",
      "confused",
      "thinking",
      "brain fog",
      "balance",
      "clumsy",
      "falling",
      "walking",
      "speech",
      "talking",
      "slurred speech",
      "personality",
      "mood",
      "changes",
      "different",
      "acting weird",
      "arm",
      "leg",
      "hand",
      "foot",
      "numb",
      "tingling",
      "twitching",
      "muscle",
      "face",
      "drooping",
      "hearing",
      "ringing in ears",
      "smell",
      "taste",
      "lose weight",
      "gain weight",
      "find",
      "found",
      "detect",
      "check",
      "test",
      "scan",
      "MRI",
      "CT scan",
      "PET scan",
      "x-ray",
      "picture",
      "images",
      "biopsy",
      "sample",
      "tissue",
      "results",
      "diagnosis",
      "diagnosed",
      "doctor said",
      "what's next",
      "treatment",
      "cure",
      "get rid of",
      "remove",
      "surgery",
      "operation",
      "op",
      "cut it out",
      "radiation",
      "radio therapy",
      "chemo",
      "chemotherapy",
      "pills",
      "medicine",
      "drugs",
      "therapy",
      "manage",
      "help",
      "side effects",
      "after treatment",
      "recovery",
      "life after",
      "outlook",
      "future",
      "survive",
      "how long",
      "live",
      "chances",
      "risk",
      "risks",
      "bad",
      "good",
      "serious",
      "dangerous",
      "spread",
      "come back",
      "recurrence",
      "what is it",
      "what are the",
      "how do you",
      "is it",
      "are there",
      "can it",
      "does it",
      "should I",
      "do I need",
      "tell me about",
      "explain",
      "info on",
      "about",
      "some",
      "any",
      "my",
      "I have",
      "I'm experiencing",
      "like",
      "such as",
      "for example",
      "a lot of",
      "a little",
      "very",
      "really",
      "kind of",
      "sort of",
      "even",
      "just",
      "only",
      "and",
      "or",
      "but",
      "so",
      "because",
      "if",
      "then",
      "when",
      "where",
      "why",
      "how",
      "this",
      "that",
      "these",
      "those",
      "there",
      "here",
      "now",
      "later",
      "soon",
      "always",
      "never",
      "often",
      "sometimes",
      "usually",
      "always",
      "never",
      "often",
      "sometimes",
      "usually",
      "mostly",
      "mainly",
      "especially",
      "also",
      "too",
      "as well",
      "first",
      "second",
      "last",
      "next",
      "final",
      "start",
      "end",
      "begin",
      "finish",
      "continue",
      "stop",
      "pause",
      "resume",
      "what",
      "is",
      "it",
      "wrong",
      "bad",
      "news",
      "good",
      "now",
      "next",
      "steps",
      "my",
      "head",
      "brain",
      "body",
      "feel",
      "feeling",
      "sick",
      "tired",
      "sleepy",
      "dizzy",
      "confused",
      "weak",
      "pain",
      "ache",
      "hurts",
      "scared",
      "worried",
      "afraid",
      "shocked",
      "upset",
      "sad",
      "anxious",
      "nervous",
      "help",
      "need",
      "support",
      "advice",
      "tell",
      "me",
      "talk",
      "about",
      "explain",
      "simply",
      "easy",
      "way",
      "in",
      "plain",
      "english",
      "simple",
      "words",
      "understand",
      "can",
      "you",
      "will",
      "i",
      "do",
      "how",
      "should",
      "headache",
      "headaches",
      "constant",
      "nausea",
      "vomiting",
      "throwing",
      "up",
      "sickness",
      "vision",
      "problems",
      "blurry",
      "double",
      "seeing",
      "eye",
      "sight",
      "can't",
      "see",
      "seizure",
      "fits",
      "shaking",
      "twitching",
      "memory",
      "forget",
      "things",
      "remember",
      "getting",
      "confused",
      "balance",
      "issues",
      "walk",
      "straight",
      "wobbly",
      "speech",
      "talk",
      "right",
      "slurred",
      "muddled",
      "personality",
      "change",
      "mood",
      "swings",
      "acting",
      "different",
      "arm",
      "leg",
      "numbness",
      "tingling",
      "muscle",
      "funny",
      "smell",
      "weird",
      "taste",
      "hearing",
      "loss",
      "ringing",
      "ears",
      "scan",
      "mri",
      "ct",
      "pet",
      "brain",
      "images",
      "pictures",
      "test",
      "tests",
      "results",
      "did",
      "show",
      "biopsy",
      "sample",
      "taking",
      "a",
      "piece",
      "diagnosed",
      "find",
      "out",
      "detect",
      "found",
      "tumor",
      "cancer",
      "cancerous",
      "not",
      "benign",
      "malignant",
      "growth",
      "lump",
      "spot",
      "grade",
      "bad",
      "size",
      "big",
      "where",
      "location",
      "treatment",
      "done",
      "options",
      "cure",
      "get",
      "rid",
      "of",
      "remove",
      "surgery",
      "operation",
      "cut",
      "it",
      "out",
      "radiation",
      "therapy",
      "radiotherapy",
      "chemo",
      "chemotherapy",
      "drugs",
      "pills",
      "medicine",
      "targeted",
      "new",
      "trials",
      "clinical",
      "side",
      "effects",
      "will",
      "happen",
      "relief",
      "manage",
      "symptoms",
      "recovery",
      "better",
      "follow",
      "up",
      "check",
      "appointments",
      "long",
      "term",
      "short",
      "outlook",
      "future",
      "what's",
      "next",
      "how",
      "long",
      "survival",
      "life",
      "expectancy",
      "come",
      "back",
      "recurrence",
      "spread",
      "dangerous",
      "serious",
      "chances",
      "risk",
      "'s",
      "please",
      "thank",
      "you",
      "thanks",
      "could",
      "explain",
      "need",
      "to",
      "know",
      "more",
      "any",
      "information",
      "on",
      "happens",
      "if",
      "does",
      "that",
      "work",
      "why",
      "this",
      "is",
      "who",
      "can",
      "where",
      "start",
    ];

    const normalizedQuery = query.toLowerCase();
    const wordsInQuery = normalizedQuery.split(/\s+/);

    const invalidWord = wordsInQuery.find(
      (word) => !keywords.includes(word.toLowerCase())
    );

    if (invalidWord) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `I don’t have access to information related to the word '${invalidWord}' or its topic. Please ask a valid question based on brain tumors.`,
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDgkcuIzJL00nfE-mH2-jp_nu2WJKKoOIQ",
        {
          contents: [
            {
              parts: [
                {
                  text:
                    "Answer the following question in 2 to 5 sentences max. Keep it clear and concise:\n\n" +
                    query,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botReply =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Please ask a valid question.";

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 360,
        height: 480,
        zIndex: 1500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: "rgb(66, 36, 41)",
          color: "#fff",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Ask Me Anything
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2, bgcolor: "#fafafa", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent={msg.from === "user" ? "flex-end" : "flex-start"}
            mb={1}
            alignItems="flex-end"
          >
            {msg.from === "bot" && (
              <Avatar sx={{ bgcolor: "#90caf9", mr: 1, width: 30, height: 30 }}>
                <SmartToyIcon fontSize="small" />
              </Avatar>
            )}
            {msg.text.includes("<a") ? (
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: msg.from === "user" ? "#d1e7dd" : "#e3f2fd",
                  maxWidth: "75%",
                  wordBreak: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: msg.from === "user" ? "#d1e7dd" : "#e3f2fd",
                  maxWidth: "75%",
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            )}
            {msg.from === "user" && (
              <Avatar sx={{ bgcolor: "#a5d6a7", ml: 1, width: 30, height: 30 }}>
                <PersonIcon fontSize="small" />
              </Avatar>
            )}
          </Box>
        ))}

        {loading && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar sx={{ bgcolor: "#90caf9", width: 30, height: 30 }}>
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Typography
              variant="body2"
              sx={{ bgcolor: "#e3f2fd", borderRadius: 2, px: 2, py: 1 }}
            >
              Typing...
            </Typography>
          </Box>
        )}

        {stage === "init" && (
          <Box display="flex" justifyContent="center" gap={2} mt={1}>
            <Button onClick={handleYes} variant="contained" size="small">
              Yes
            </Button>
            <Button onClick={handleNo} variant="outlined" size="small">
              No
            </Button>
          </Box>
        )}

        {stage === "askCity" && (
          <Box display="flex" gap={1} mt={2} px={1}>
            <TextField
              variant="standard"
              placeholder="Enter your city (e.g., Kolkata, Delhi)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              // fullWidth
              InputProps={{
                sx: {
                  // borderRadius: "25px",
                  borderRadius: 1,
                  bgcolor: "#fff",
                  px: 1,
                  boxShadow: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(66, 36, 41)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(100, 8, 22)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(100, 8, 22)",
                    borderWidth: 2,
                  },
                },
              }}
            />
            <Button
              onClick={handleCitySubmit}
              variant="contained"
              sx={{
                fontSize: "12px",
                borderRadius: 1,
              }}
            >
              Submit
            </Button>
          </Box>
        )}

        {stage === "noResponse" && (
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              onClick={handleAskLocation}
              variant="contained"
              size="small"
              sx={{
                fontSize: "12px",
              }}
            >
              Ask for Location
            </Button>
            {showContinueChat && (
              <Button
                onClick={handleStartFreeChat}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: "12px",
                }}
              >
                Continue Chatting
              </Button>
            )}
          </Box>
        )}

        {showContinueChat && stage === "done" && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              onClick={handleStartFreeChat}
              variant="contained"
              size="small"
            >
              Continue Chatting
            </Button>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      {stage === "chatMode" && (
        <Box sx={{ display: "flex", alignItems: "center", p: 0 }}>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the normal border
                },
                "&:hover fieldset": {
                  border: "none", // Remove hover border
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />

          <IconButton
            onClick={handleSendMessage}
            color="primary"
            sx={{ ml: 0 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}

      <Divider />
    </Paper>
  );
};

export default ChatBot;
