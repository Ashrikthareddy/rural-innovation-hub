'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sprout } from 'lucide-react';

type Lang = 'en' | 'hi' | 'te';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

// ─── UI Text ───────────────────────────────────────────────────────────────────
const UI: Record<Lang, { subtitle: string; placeholder: string; welcome: string }> = {
  en: {
    subtitle: 'Farming Assistant • Always Online',
    placeholder: 'Ask about farming…',
    welcome: 'Namaste! 🌱 I am KisanBot. Ask me anything about farming — irrigation, soil, pest control, government schemes, and more!',
  },
  hi: {
    subtitle: 'किसान सहायक • हमेशा ऑनलाइन',
    placeholder: 'खेती के बारे में पूछें…',
    welcome: 'नमस्ते! 🌱 मैं किसानबॉट हूँ। सिंचाई, मिट्टी, कीट नियंत्रण, सरकारी योजनाओं के बारे में कुछ भी पूछें!',
  },
  te: {
    subtitle: 'రైతు సహాయకుడు • ఎల్లప్పుడూ ఆన్‌లైన్',
    placeholder: 'వ్యవసాయం గురించి అడగండి…',
    welcome: 'నమస్కారం! 🌱 నేను కిసాన్‌బాట్. నీటిపారుదల, నేల, పురుగు నియంత్రణ, ప్రభుత్వ పథకాల గురించి ఏదైనా అడగండి!',
  },
};

// ─── Suggested questions ───────────────────────────────────────────────────────
const SUGGESTIONS: Record<Lang, string[]> = {
  en: ['How to make organic pesticide?', 'Tell me about drip irrigation', 'Government schemes for farmers'],
  hi: ['जैविक कीटनाशक कैसे बनाएं?', 'ड्रिप सिंचाई के बारे में बताएं', 'किसानों के लिए सरकारी योजनाएं'],
  te: ['సేంద్రీయ పురుగుమందు ఎలా తయారు చేయాలి?', 'బిందు సేద్యం గురించి చెప్పండి', 'రైతుల కోసం ప్రభుత్వ పథకాలు'],
};

// ─── Knowledge Base ────────────────────────────────────────────────────────────
// ─── Knowledge Base ────────────────────────────────────────────────────────────
interface KBEntry {
  regex: RegExp;
  answers: Record<Lang, string>;
}

const KB: KBEntry[] = [
  {
    regex: /hello|hi|hey|namaste|namaskar|good morning|good evening/i,
    answers: {
      en: 'Namaste! 🌱 I am KisanBot, your farming assistant. Ask me about irrigation, soil health, pest control, post-harvest, or government schemes!',
      hi: 'नमस्ते! 🌱 मैं किसानबॉट हूँ। सिंचाई, मिट्टी की सेहत, कीट नियंत्रण, फसल कटाई के बाद या सरकारी योजनाओं के बारे में पूछें!',
      te: 'నమస్కారం! 🌱 నేను కిసాన్‌బాట్. నీటిపారుదల, నేల ఆరోగ్యం, పురుగు నియంత్రణ, పంట తర్వాత నిల్వ లేదా ప్రభుత్వ పథకాల గురించి అడగండి!',
    },
  },
  {
    regex: /drip irrigation|drip system|ड्रिप सिंचाई|బిందు సేద్యం/i,
    answers: {
      en: '💧 Drip irrigation delivers water directly to roots, cutting water use by 40–60%.\n\n• Cost: ₹15,000–₹45,000/acre (subsidised under PM Krishi Sinchai Yojana)\n• Reduces weeds and soil erosion\n• Ideal for vegetables, fruits, cotton, sugarcane\n\nTip: A gravity-fed drip system from an overhead tank costs zero electricity.',
      hi: '💧 ड्रिप सिंचाई सीधे जड़ों तक पानी पहुँचाती है, पानी की बचत 40–60% होती है।\n\n• लागत: ₹15,000–₹45,000/एकड़ (PM कृषि सिंचाई योजना में सब्सिडी)\n• खरपतवार और मिट्टी कटाव कम होता है\n• सब्जियाँ, फल, कपास, गन्ने के लिए उपयुक्त\n\nटिप: ओवरहेड टैंक से गुरुत्व आधारित ड्रिप सिस्टम में बिजली का खर्च शून्य।',
      te: '💧 బిందు సేద్యం నేరుగా వేర్లకు నీరు అందిస్తుంది, నీటి వినియోగం 40–60% తగ్గుతుంది.\n\n• ధర: ₹15,000–₹45,000/ఎకరా (PM కృషి సించాయి యోజన కింద సబ్సిడీ)\n• కలుపు మొక్కలు మరియు నేల కోత తగ్గుతాయి\n• కూరగాయలు, పండ్లు, పత్తి, చెరకుకు అనుకూలం\n\nటిప్: ఓవర్‌హెడ్ ట్యాంక్ ద్వారా గ్రావిటీ బిందు సేద్యంలో విద్యుత్ ఖర్చు శూన్యం.',
    },
  },
  {
    regex: /rainwater harvest|rain water|water collection|water storage|वर्षा जल|వర్షపు నీరు/i,
    answers: {
      en: '🌧️ Rainwater harvesting for farms:\n\n• Farm Ponds – 20×20 ft ponds store 4–5 lakh litres\n• Rooftop collection – 1,000 sq ft roof yields 55,000 L per 100 mm rain\n• Tanka – traditional underground cistern\n• Contour bunds – recharge groundwater\n\nGovernment subsidy: 50–75% under PM Krishi Sinchai Yojana.',
      hi: '🌧️ खेत में वर्षा जल संचयन:\n\n• खेत तालाब – 20×20 फुट के तालाब में 4–5 लाख लीटर भंडारण\n• छत का पानी – 100 मिमी बारिश में 1,000 वर्गफुट छत से 55,000 लीटर\n• टांका – पारंपरिक भूमिगत जलाशय\n• कंटूर बंड – भूजल पुनर्भरण\n\nसरकारी सब्सिडी: PM कृषि सिंचाई योजना में 50–75%।',
      te: '🌧️ వ్యవసాయంలో వర్షపు నీటి సంరక్షణ:\n\n• చెరువులు – 20×20 అడుగుల చెరువులలో 4–5 లక్షల లీటర్లు\n• పైకప్పు సేకరణ – 100 మిమీ వర్షానికి 1,000 చ.అ. పైకప్పు నుండి 55,000 లీటర్లు\n• తాంక – సంప్రదాయ భూగర్భ నిల్వ\n• కంటూర్ బండ్లు – భూగర్భ జలాల పునర్విభజన\n\nప్రభుత్వ సబ్సిడీ: PM కృషి సించాయి యోజన కింద 50–75%.',
    },
  },
  {
    regex: /vermicompost|earthworm|worm compost|केंचुआ खाद|వర్మీ కంపోస్ట్/i,
    answers: {
      en: '🪱 Vermicomposting — best low-cost soil enricher:\n\n• 6×3 ft bed with bricks, fill with cow dung + crop waste\n• Add earthworms (Eisenia fetida)\n• Harvest 50 kg compost every 45 days\n• Setup cost: ₹500–₹800\n• Replaces ₹4,000+ of chemical fertilizers per acre\n\nImproves water retention and adds beneficial microbes.',
      hi: '🪱 वर्मीकम्पोस्ट — कम लागत में सबसे अच्छा मृदा संवर्धक:\n\n• ईंटों से 6×3 फुट की क्यारी, गोबर + फसल अपशिष्ट भरें\n• केंचुए डालें (Eisenia fetida)\n• हर 45 दिनों में 50 किग्रा खाद मिलती है\n• स्थापना लागत: ₹500–₹800\n• प्रति एकड़ ₹4,000+ रासायनिक खाद की बचत\n\nजल धारण क्षमता और मिट्टी के सूक्ष्मजीव बढ़ते हैं।',
      te: '🪱 వర్మీ కంపోస్ట్ — తక్కువ ఖర్చుతో అత్యుత్తమ నేల మెరుగు:\n\n• ఇటుకలతో 6×3 అడుగుల మడి, ఆవు పేడ + పంట వ్యర్థాలు నింపండి\n• వానపాముల (Eisenia fetida) చేర్చండి\n• ప్రతి 45 రోజులకు 50 కేజీల కంపోస్ట్\n• ఏర్పాటు ఖర్చు: ₹500–₹800\n• ఎకరాకు ₹4,000+ రసాయన ఎరువుల ఆదా\n\nనీటి నిలుపుదల మరియు నేల సూక్ష్మజీవులు మెరుగవుతాయి.',
    },
  },
  {
    regex: /soil health|soil test|soil quality|ph|soil nutrient|मिट्टी|నేల/i,
    answers: {
      en: '🌍 Improving soil health naturally:\n\n• Soil test at Krishi Vigyan Kendra — free or ₹100\n• Ideal crop pH: 6.0–7.5\n• Add vermicompost, green manure (dhaincha/sunhemp)\n• Rotate legumes (moong, arhar) to fix nitrogen\n• Soil Health Card Scheme: free testing every 2 years',
      hi: '🌍 मिट्टी की सेहत सुधारें:\n\n• कृषि विज्ञान केंद्र में मिट्टी परीक्षण — मुफ्त या ₹100\n• आदर्श फसल पीएच: 6.0–7.5\n• वर्मीकम्पोस्ट, हरी खाद (ढैंचा/सनहेम्प) डालें\n• नाइट्रोजन के लिए दलहनी फसलें (मूंग, अरहर) बोएं\n• मृदा स्वास्थ्य कार्ड योजना: हर 2 साल मुफ्त परीक्षण',
      te: '🌍 నేల ఆరోగ్యాన్ని సహజంగా మెరుగుపరచండి:\n\n• కృషి విజ్ఞాన కేంద్రంలో నేల పరీక్ష — ఉచితం లేదా ₹100\n• అనుకూల pH: 6.0–7.5\n• వర్మీ కంపోస్ట్, పచ్చిరొట్ట ఎరువు (ధైంచా) వేయండి\n• నత్రజని కోసం పప్పుధాన్యాలు (మినుము, కందులు) నాటండి\n• నేల ఆరోగ్య కార్డ్ పథకం: ప్రతి 2 సంవత్సరాలకు ఉచిత పరీక్ష',
    },
  },
  {
    regex: /neem|organic pesticide|natural pesticide|bio pesticide|pest control|insect|కీటక|పురుగు/i,
    answers: {
      en: '🌿 Neem-based organic pesticide:\n\n1. Soak 500g neem seeds overnight, crush and strain\n2. Mix with 10L water + 5g soap powder\n3. Add 10 garlic cloves + 5 green chillies\n• Spray every 7–10 days on leaves\n• Controls 200+ insect pests\n• Cost: ₹40–60 per 10L vs ₹350 for chemicals',
      hi: '🌿 नीम आधारित जैविक कीटनाशक:\n\n1. 500 ग्राम नीम के बीज रात भर भिगोएं, पीसकर छान लें\n2. 10 लीटर पानी + 5 ग्राम साबुन पाउडर मिलाएं\n3. 10 लहसुन की कलियाँ + 5 हरी मिर्च डालें\n• हर 7–10 दिन में पत्तियों पर छिड़काव करें\n• 200+ कीटों पर नियंत्रण\n• लागत: 10 लीटर में ₹40–60 बनाम रसायन ₹350',
      te: '🌿 వేప ఆధారిత సేంద్రీయ పురుగుమందు:\n\n1. 500 గ్రా వేప గింజలు రాత్రంతా నానబెట్టి, నలిపి వడపోయండి\n2. 10 లీ నీళ్ళు + 5 గ్రా సబ్బు పొడి కలపండి\n3. 10 వెల్లుల్లి వాసన + 5 పచ్చి మిర్చి చేర్చండి\n• ప్రతి 7–10 రోజులకు ఆకులపై పిచికారీ చేయండి\n• 200+ పురుగులను నియంత్రిస్తుంది\n• ధర: 10 లీటరుకు ₹40–60 vs రసాయనాలు ₹350',
    },
  },
  {
    regex: /solar|sun energy|solar dryer|solar pump|solar panel|सौर|సోలార్/i,
    answers: {
      en: '☀️ Solar solutions for farmers:\n\n• Solar Crop Dryer – drying time 1–2 days instead of 5–7\n• Solar Water Pump – PM Kusum Scheme: 60% subsidy (₹20,000–₹50,000)\n• Solar Fencing – protects from wild animals\n• Solar Biogas – 24/7 energy from digester + solar\n\nPM Kusum Helpline: 1800-180-1551',
      hi: '☀️ किसानों के लिए सौर ऊर्जा समाधान:\n\n• सौर फसल सुखाने की मशीन – 5–7 दिन की बजाय 1–2 दिन में सूखाई\n• सौर जल पंप – PM कुसुम योजना: 60% सब्सिडी (₹20,000–₹50,000)\n• सौर बाड़ – जंगली जानवरों से फसल सुरक्षा\n• सौर बायोगैस – 24/7 ऊर्जा\n\nPM कुसुम हेल्पलाइन: 1800-180-1551',
      te: '☀️ రైతులకు సోలార్ పరిష్కారాలు:\n\n• సోలార్ పంట ఆరబెట్టే యంత్రం – 5–7 రోజులు కాకుండా 1–2 రోజుల్లో ఆరుతుంది\n• సోలార్ నీటి పంపు – PM కుసుమ్ పథకం: 60% సబ్సిడీ (₹20,000–₹50,000)\n• సోలార్ కంచె – అడవి జంతువుల నుండి రక్షణ\n• సోలార్ బయోగ్యాస్ – 24/7 శక్తి\n\nPM కుసుమ్ హెల్ప్‌లైన్: 1800-180-1551',
    },
  },
  {
    regex: /biogas|gobar gas|methane|bio gas|बायोगैस|బయోగ్యాస్/i,
    answers: {
      en: '⚡ Biogas digester basics:\n\n• 2m³ digester for 4–6 family members\n• Uses: cow dung 4–5 kg/day + kitchen waste\n• Produces 1–1.5 m³ gas/day (saves 2 LPG cylinders/month)\n• Slurry = rich organic fertilizer\n• Cost: ₹20,000–₹40,000, NBMMP subsidy ₹7,000–₹12,000',
      hi: '⚡ बायोगैस डाइजेस्टर की मूल बातें:\n\n• 4–6 लोगों के परिवार के लिए 2 घन मीटर डाइजेस्टर\n• उपयोग: 4–5 किग्रा गोबर/दिन + रसोई का कचरा\n• 1–1.5 m³ गैस/दिन (2 LPG सिलेंडर की बचत/माह)\n• स्लरी = समृद्ध जैविक खाद\n• लागत: ₹20,000–₹40,000, NBMMP सब्सिडी ₹7,000–₹12,000',
      te: '⚡ బయోగ్యాస్ డైజెస్టర్ ప్రాథమికాలు:\n\n• 4–6 మంది కుటుంబానికి 2 m³ డైజెస్టర్\n• వినియోగం: 4–5 కేజీ పశువుల పేడ/రోజు + వంటిల్లు వ్యర్థాలు\n• 1–1.5 m³ గ్యాస్/రోజు (నెలకు 2 LPG సిలిండర్లు ఆదా)\n• స్లర్రీ = సమృద్ధ సేంద్రీయ ఎరువు\n• ధర: ₹20,000–₹40,000, NBMMP సబ్సిడీ ₹7,000–₹12,000',
    },
  },
  {
    regex: /mushroom|dhingri|oyster mushroom|मшрум|మशరూమ్|పుట్టగొడుగు/i,
    answers: {
      en: '🍄 Mushroom cultivation — great off-season income:\n\n• Oyster mushrooms grow on straw in 25 days\n• ₹500–₹800 per batch → 8–10 kg yield\n• Selling price: ₹120–₹180/kg\n• Net profit: ₹700–₹1,200 per cycle\n• Needs only a shaded 8×10 ft space',
      hi: '🍄 मशरूम की खेती — बेहतरीन ऑफ-सीजन आय:\n\n• पुआल पर ऑयस्टर मशरूम 25 दिनों में तैयार\n• ₹500–₹800 प्रति बैच → 8–10 किग्रा उपज\n• बिक्री मूल्य: ₹120–₹180/किग्रा\n• शुद्ध लाभ: ₹700–₹1,200 प्रति चक्र\n• केवल 8×10 फुट छायादार जगह चाहिए',
      te: '🍄 పుట్టగొడుగుల సాగు — అద్భుతమైన ఆఫ్-సీజన్ ఆదాయం:\n\n• గడ్డిపై ఆయిస్టర్ పుట్టగొడుగులు 25 రోజుల్లో తయారవుతాయి\n• ₹500–₹800 ప్రతి బ్యాచ్ → 8–10 కేజీ దిగుబడి\n• విక్రయ ధర: ₹120–₹180/కేజీ\n• నికర లాభం: ₹700–₹1,200 ప్రతి చక్రానికి\n• కేవలం 8×10 అడుగుల నీడ స్థలం సరిపోతుంది',
    },
  },
  {
    regex: /seed bank|seed storage|traditional seeds|local seeds|desi seeds|बीज बैंक|విత్తన బ్యాంకు/i,
    answers: {
      en: '🌾 Community Seed Banks:\n\n• Store seeds in glass jars with neem leaf powder\n• Label with variety, date, village\n• Keep in cool, dry, dark place\n• Exchange seeds with neighbours after harvest\n• Traditional varieties are drought/pest resistant\n\nJoin NABARD-supported seed bank initiatives.',
      hi: '🌾 सामुदायिक बीज बैंक:\n\n• बीज नीम पत्ती पाउडर के साथ शीशे के जार में रखें\n• किस्म, तारीख, गाँव का लेबल लगाएं\n• ठंडी, सूखी, अंधेरी जगह में रखें\n• फसल के बाद पड़ोसियों से बीज अदला-बदली करें\n• देसी किस्में सूखे/कीट प्रतिरोधी होती हैं\n\nNABARD समर्थित बीज बैंक पहल से जुड़ें।',
      te: '🌾 కమ్యూనిటీ విత్తన బ్యాంకులు:\n\n• వేప పొడితో గాజు జార్లలో విత్తనాలు నిల్వ చేయండి\n• వెరైటీ, తేదీ, గ్రామం పేరు రాయండి\n• చల్లని, పొడి, చీకటి చోట ఉంచండి\n• పంట తర్వాత పొరుగువారితో విత్తనాలు మార్చుకోండి\n• దేశీ వెరైటీలు కరువు/పురుగు నిరోధకం\n\nNABARD మద్దతు గల విత్తన బ్యాంకు కార్యక్రమాల్లో చేరండి.',
    },
  },
  {
    regex: /greenhouse|poly tunnel|polyhouse|shade net|पॉलीहाउस|పాలీ టన్నెల్/i,
    answers: {
      en: '🏗️ Low-cost poly tunnel greenhouse:\n\n• Bamboo/GI pipe frame + UV-stabilised plastic\n• Cost: ₹80,000–₹1,50,000 per 1,000 sq ft\n• Government subsidy: 50% under NHM\n• Extends growing season by 3–4 months\n• Ideal for tomatoes, capsicum, cucumber, flowers',
      hi: '🏗️ कम लागत पॉली टनल ग्रीनहाउस:\n\n• बाँस/GI पाइप ढांचा + UV स्थिर प्लास्टिक शीट\n• लागत: ₹80,000–₹1,50,000 प्रति 1,000 वर्गफुट\n• सरकारी सब्सिडी: NHM में 50%\n• खेती का मौसम 3–4 महीने बढ़ता है\n• टमाटर, शिमला मिर्च, खीरा, फूलों के लिए उपयुक्त',
      te: '🏗️ తక్కువ ధరలో పాలీ టన్నెల్ గ్రీన్‌హౌస్:\n\n• వెదురు/GI పైపు ఫ్రేమ్ + UV స్థిరీకృత ప్లాస్టిక్ షీట్\n• ధర: ₹80,000–₹1,50,000 ప్రతి 1,000 చ.అ.\n• ప్రభుత్వ సబ్సిడీ: NHM కింద 50%\n• పెరుగుదల కాలం 3–4 నెలలు పొడిగించబడుతుంది\n• టమాటాలు, క్యాప్సికం, దోసకాయ, పూలకు అనుకూలం',
    },
  },
  {
    regex: /fertilizer|fertiliser|urea|compost|manure|npk|खाद|ఎరువు/i,
    answers: {
      en: '🌱 Balanced fertilization guide:\n\n• Always start with a soil test\n• Apply FYM 5–10 tonnes/acre before sowing\n• Vermicompost 2–3 tonnes/acre at seeding\n• Urea: split doses — 50% at sowing, 50% at tillering\n• Green manuring with dhaincha adds 50–80 kg N/acre free',
      hi: '🌱 संतुलित उर्वरक प्रबंधन:\n\n• हमेशा मिट्टी परीक्षण से शुरू करें\n• बुवाई से पहले FYM 5–10 टन/एकड़ डालें\n• बीज बोते समय 2–3 टन/एकड़ वर्मीकम्पोस्ट\n• यूरिया: विभाजित मात्रा — 50% बुवाई पर, 50% कल्ले निकलते समय\n• ढैंचे की हरी खाद से 50–80 किग्रा N/एकड़ मुफ्त',
      te: '🌱 సమతుల్య ఎరువుల నిర్వహణ:\n\n• ఎప్పుడూ నేల పరీక్షతో మొదలుపెట్టండి\n• విత్తే ముందు FYM 5–10 టన్నులు/ఎకరా వేయండి\n• విత్తే సమయంలో వర్మీ కంపోస్ట్ 2–3 టన్నులు/ఎకరా\n• యూరియా: విభజించి వేయండి — 50% విత్తేటప్పుడు, 50% తిలర్ దశలో\n• ధైంచా పచ్చిరొట్ట ఎకరాకు 50–80 కేజీ నత్రజని ఉచితంగా అందిస్తుంది',
    },
  },
  {
    regex: /water pump|pump|irrigation pump|lift water|पानी पंप|నీటి పంపు/i,
    answers: {
      en: '💦 Low-cost water lifting options:\n\n• Rope Pump – bicycle wheel + rubber discs, lifts 1,500 L/hr, costs ₹900\n• Treadle Pump – foot-powered, lifts from 7m, ₹3,000–₹5,000\n• Solar Pump – PM Kusum subsidy 60%\n\nFor deep borewells (>30m), electric submersibles are most practical.',
      hi: '💦 कम लागत जल उठान विकल्प:\n\n• रस्सी पंप – साइकिल पहिया + रबड़ डिस्क, 1,500 L/घंटा, लागत ₹900\n• ट्रेडल पंप – पैर से चलाने वाला, 7 मीटर गहराई से, ₹3,000–₹5,000\n• सौर पंप – PM कुसुम में 60% सब्सिडी\n\n30 मीटर से गहरे बोरवेल के लिए बिजली पंप व्यावहारिक रहता है।',
      te: '💦 తక్కువ ఖర్చుతో నీటి ఎత్తిపోత అవకాశాలు:\n\n• తాడు పంపు – సైకిల్ చక్రం + రబ్బర్ డిస్కులు, 1,500 L/గంట, ₹900\n• ట్రెడిల్ పంపు – కాలితో నడిచే, 7 మీ లోతు నుండి, ₹3,000–₹5,000\n• సోలార్ పంపు – PM కుసుమ్‌లో 60% సబ్సిడీ\n\n30 మీటర్ కంటే లోతైన బోర్‌వెల్‌లకు విద్యుత్ సబ్మెర్సిబుల్ అనుకూలం.',
    },
  },
  {
    regex: /post harvest|storage|grain storage|warehouse|silo|cold storage|फसल भंडारण|నిల్వ/i,
    answers: {
      en: '📦 Post-harvest loss reduction:\n\n• Hermetic bags – no chemicals, ₹120–₹200/bag\n• Dry grains to <12% moisture before storage\n• Neem leaf/dry chilli layers repel insects\n• NABARD RIDF subsidy for village cold storage\n\nPost-harvest losses average 10–15% — good storage saves ₹8,000–₹15,000/acre.',
      hi: '📦 फसल कटाई के बाद नुकसान कम करें:\n\n• हर्मेटिक बैग – बिना रसायन, ₹120–₹200/बैग\n• भंडारण से पहले नमी <12% तक सुखाएं\n• नीम पत्ती/सूखी मिर्च से कीड़े दूर रहते हैं\n• ग्राम शीतगृह के लिए NABARD RIDF सब्सिडी\n\nकटाई के बाद औसत 10–15% नुकसान — अच्छा भंडारण ₹8,000–₹15,000/एकड़ बचाता है।',
      te: '📦 పంట తర్వాత నష్టాన్ని తగ్గించండి:\n\n• హెర్మెటిక్ బ్యాగులు – రసాయనాలు లేకుండా, ₹120–₹200/బ్యాగ్\n• నిల్వకు ముందు తేమ <12% వరకు ఆరబెట్టండి\n• వేప ఆకు/ఎండు మిర్చి పొరలు పురుగులను తరిమివేస్తాయి\n• గ్రామ శీతల గిడ్డంగికి NABARD RIDF సబ్సిడీ\n\nపంట తర్వాత సగటు 10–15% నష్టం — మంచి నిల్వ ₹8,000–₹15,000/ఎకరా ఆదా చేస్తుంది.',
    },
  },
  {
    regex: /government scheme|subsidy|pm kisan|kcc|loan|finance|credit|सरकारी योजना|ప్రభుత్వ పథకం/i,
    answers: {
      en: '🏛️ Key government schemes for farmers:\n\n• PM Kisan Samman Nidhi – ₹6,000/year to bank\n• Kisan Credit Card (KCC) – 4% interest up to ₹3 lakh\n• PM Fasal Bima Yojana – crop insurance\n• PM Kusum – solar pump subsidy 60%\n• eNAM – online mandi (enam.gov.in)\n\nApply at Common Service Centre (CSC) or bank.',
      hi: '🏛️ किसानों के लिए मुख्य सरकारी योजनाएं:\n\n• PM किसान सम्मान निधि – ₹6,000/वर्ष सीधे बैंक में\n• किसान क्रेडिट कार्ड (KCC) – 4% ब्याज दर, ₹3 लाख तक\n• PM फसल बीमा योजना – फसल बीमा\n• PM कुसुम – सौर पंप पर 60% सब्सिडी\n• eNAM – ऑनलाइन मंडी (enam.gov.in)\n\nआवेदन: नजदीकी CSC केंद्र या बैंक में।',
      te: '🏛️ రైతులకు ముఖ్యమైన ప్రభుత్వ పథకాలు:\n\n• PM కిసాన్ సమ్మాన్ నిధి – ₹6,000/సంవత్సరం నేరుగా బ్యాంకుకు\n• కిసాన్ క్రెడిట్ కార్డ్ (KCC) – 4% వడ్డీకి ₹3 లక్షల వరకు రుణం\n• PM ఫసల్ బీమా యోజన – పంట బీమా\n• PM కుసుమ్ – సోలార్ పంపుకు 60% సబ్సిడీ\n• eNAM – ఆన్‌లైన్ మండీ (enam.gov.in)\n\nదరఖాస్తు: సమీప CSC కేంద్రం లేదా బ్యాంకులో.',
    },
  },
  {
    regex: /crop rotation|intercrop|mixed crop|companion plant|फसल चक्र|పంట మారుస్తారు/i,
    answers: {
      en: '🔄 Crop rotation best practices:\n\n• Alternate cereals with legumes (rice → moong → wheat)\n• Legumes fix 40–200 kg nitrogen/acre — saves fertilizer cost\n• Intercropping pigeonpea + sorghum reduces pests\n• Marigold border crop repels nematodes\n\nRotation improves soil organic matter by 0.1–0.3% per year.',
      hi: '🔄 फसल चक्र की सर्वोत्तम प्रथाएं:\n\n• अनाज और दलहन का चक्र बनाएं (धान → मूंग → गेहूं)\n• दलहनी फसलें 40–200 किग्रा नाइट्रोजन/एकड़ स्थिर करती हैं\n• अरहर + ज्वार की मिश्रित खेती कीट कम करती है\n• सीमा पर गेंदे की खेती से सूत्रकृमि दूर रहते हैं\n\nफसल चक्र से मिट्टी में कार्बनिक पदार्थ 0.1–0.3% प्रति वर्ष बढ़ता है।',
      te: '🔄 పంట మార్పిడి ఉత్తమ పద్ధతులు:\n\n• ధాన్యం మరియు పప్పుధాన్యాల మార్పిడి (వరి → మినుము → గోధుమ)\n• పప్పుధాన్యాలు ఎకరాకు 40–200 కేజీ నత్రజని స్థిర పరుస్తాయి\n• కందులు + జొన్నల మిశ్రమ సాగు పురుగులు తగ్గిస్తుంది\n• సరిహద్దున బంతిపూలు నిమటోడ్లను దూరంగా ఉంచుతాయి\n\nపంట మార్పిడి నేలలో సేంద్రీయ పదార్థాన్ని సంవత్సరానికి 0.1–0.3% పెంచుతుంది.',
    },
  },
  {
    regex: /drought|dry spell|water stress|water scarce|rain fail|सूखा|కరువు/i,
    answers: {
      en: '🏜️ Drought resilience:\n\n• Drought-tolerant varieties: millets, sorghum, cluster bean\n• Mulching reduces evaporation by 50%\n• Deep ploughing before monsoon improves infiltration\n• Millets need 5× less water than rice\n• Farm pond + drip irrigation = best combination',
      hi: '🏜️ सूखा सहनशीलता:\n\n• सूखा प्रतिरोधी किस्में: बाजरा, ज्वार, ग्वार\n• मल्चिंग से वाष्पोत्सर्जन 50% कम होता है\n• मानसून से पहले गहरी जुताई से मिट्टी में पानी रिसाव बढ़ता है\n• बाजरे को धान से 5 गुना कम पानी चाहिए\n• खेत तालाब + ड्रिप सिंचाई = सबसे अच्छा संयोजन',
      te: '🏜️ కరువు నిరోధకత:\n\n• కరువు తట్టుకునే వెరైటీలు: చిరుధాన్యాలు, జొన్నలు, గ్వార్\n• మల్చింగ్ వల్ల ఆవిరి 50% తగ్గుతుంది\n• వర్షాలకు ముందు లోతైన దుక్కి నీటి ఇంకుడు పెంచుతుంది\n• చిరుధాన్యాలకు వరికంటే 5 రెట్లు తక్కువ నీళ్ళు చాలు\n• చెరువు + బిందు సేద్యం = అత్యుత్తమ కలయిక',
    },
  },
  {
    regex: /organic farming|organic certif|jaivik|natural farming|जैविक खेती|సేంద్రీయ వ్యవసాయం/i,
    answers: {
      en: '🌿 Getting started with organic farming:\n\n• Transition period: 3 years before certified organic label\n• Use vermicompost, FYM, neem, bio-fertilizers only\n• PGS-India certification — free and community-based\n• Organic produce sells 20–100% higher\n• PKVY scheme: ₹50,000/ha over 3 years for group organic farming',
      hi: '🌿 जैविक खेती शुरू करें:\n\n• प्रमाणित जैविक लेबल से पहले 3 वर्ष का संक्रमण काल\n• केवल वर्मीकम्पोस्ट, FYM, नीम, जैव उर्वरकों का उपयोग\n• PGS-India प्रमाणीकरण — मुफ्त, समुदाय आधारित\n• जैविक उत्पाद 20–100% अधिक दाम पर बिकता है\n• PKVY योजना: 3 साल में ₹50,000/हेक्टेयर',
      te: '🌿 సేంద్రీయ వ్యవసాయం మొదలుపెట్టడం:\n\n• సేంద్రీయ లేబుల్ కు ముందు 3 సంవత్సరాల మార్పు గడువు\n• వర్మీ కంపోస్ట్, FYM, వేప, జీవ ఎరువులు మాత్రమే వినియోగించండి\n• PGS-India సర్టిఫికేషన్ — ఉచితం, కమ్యూనిటీ ఆధారిత\n• సేంద్రీయ ఉత్పత్తులు 20–100% అధిక ధరకు అమ్ముడవుతాయి\n• PKVY పథకం: 3 సంవత్సరాల్లో ₹50,000/హెక్టారు',
    },
  },
  {
    regex: /msp|minimum support|procurement|sell crop|market price|मंडी|మార్కెట్/i,
    answers: {
      en: '💰 Getting better prices for your crops:\n\n• MSP – sell at government procurement centres\n• eNAM (enam.gov.in) – compare mandi prices online\n• FPO – collective selling for better rates\n• Direct marketing: haats, organic markets, online\n• Value addition: oil, jaggery, pickle = 3–5× price',
      hi: '💰 फसल का बेहतर दाम पाएं:\n\n• MSP – सरकारी खरीद केंद्रों पर बेचें\n• eNAM (enam.gov.in) – मंडी भाव ऑनलाइन देखें\n• FPO – सामूहिक बिक्री से बेहतर दाम\n• प्रत्यक्ष विपणन: हाट, जैविक बाजार, ऑनलाइन\n• मूल्य संवर्धन: तेल, गुड़, अचार = 3–5 गुना दाम',
      te: '💰 పంటకు మంచి ధర పొందండి:\n\n• MSP – ప్రభుత్వ కొనుగోలు కేంద్రాల్లో అమ్మండి\n• eNAM (enam.gov.in) – మండీ ధరలు ఆన్‌లైన్‌లో చూడండి\n• FPO – సమష్టి విక్రయం ద్వారా మంచి ధర\n• ప్రత్యక్ష విక్రయం: సంతలు, సేంద్రీయ మార్కెట్లు, ఆన్‌లైన్\n• విలువ జోడింపు: నూనె, బెల్లం, పచ్చడి = 3–5 రెట్లు ధర',
    },
  },
  {
    regex: /bamboo|cane|grass|बाँस|వెదురు/i,
    answers: {
      en: '🎋 Bamboo for farmers:\n\n• Ready in 3–4 years, then annual harvests\n• Replaces PVC pipes (saves ₹15,000/acre)\n• Bamboo fencing: ₹30–₹50/linear ft vs ₹200+ metal\n• Biochar improves soil water retention by 30%\n• Sell bamboo at ₹25–₹80/culm\n\nNational Bamboo Mission offers plantation subsidies.',
      hi: '🎋 किसानों के लिए बाँस:\n\n• 3–4 साल में तैयार, फिर हर साल कटाई\n• PVC पाइप की जगह (₹15,000/एकड़ की बचत)\n• बाँस की बाड़: ₹30–₹50/रैखिक फुट बनाम धातु ₹200+\n• बायोचार से मिट्टी की जल धारण 30% बढ़ती है\n• बाँस ₹25–₹80/तना बिकता है\n\nराष्ट्रीय बाँस मिशन में रोपण सब्सिडी मिलती है।',
      te: '🎋 రైతులకు వెదురు:\n\n• 3–4 సంవత్సరాల్లో తయారవుతుంది, తర్వాత ఏటా కోత\n• PVC పైపుల స్థానంలో (ఎకరాకు ₹15,000 ఆదా)\n• వెదురు కంచె: ₹30–₹50/లీనియర్ అడుగు vs లోహం ₹200+\n• బయోచార్ నేల నీటి నిలుపుదలను 30% పెంచుతుంది\n• వెదురు ₹25–₹80/కల్మ్‌కు అమ్ముడవుతుంది\n\nజాతీయ వెదురు మిషన్ సాగు సబ్సిడీలు అందిస్తుంది.',
    },
  },
  {
    regex: /help|what can you|what do you know|topic|question|ఏమి అడగాలి/i,
    answers: {
      en: '🌾 I can help you with:\n\n• 💧 Irrigation (drip, rope pump, rainwater)\n• 🌍 Soil health & composting\n• 🌿 Organic pesticides & pest control\n• ☀️ Solar energy & biogas\n• 🍄 Mushroom & off-season crops\n• 📦 Post-harvest storage\n• 🏛️ Government schemes & subsidies\n• 💰 Market prices & selling crops\n• 🌾 Seed banks & drought management\n\nJust type your question!',
      hi: '🌾 मैं इन विषयों पर मदद कर सकता हूँ:\n\n• 💧 सिंचाई (ड्रिप, रस्सी पंप, वर्षा जल)\n• 🌍 मिट्टी की सेहत और खाद\n• 🌿 जैविक कीटनाशक और कीट नियंत्रण\n• ☀️ सौर ऊर्जा और बायोगैस\n• 🍄 मशरूम और ऑफ-सीजन फसलें\n• 📦 फसल कटाई के बाद भंडारण\n• 🏛️ सरकारी योजनाएं और सब्सिडी\n• 💰 मंडी भाव और फसल बिक्री\n• 🌾 बीज बैंक और सूखा प्रबंधन\n\nबस अपना सवाल टाइप करें!',
      te: '🌾 నేను ఈ విషయాలలో సహాయపడగలను:\n\n• 💧 నీటిపారుదల (బిందు, తాడు పంపు, వర్షపు నీరు)\n• 🌍 నేల ఆరోగ్యం & కంపోస్ట్\n• 🌿 సేంద్రీయ పురుగుమందులు & పురుగు నియంత్రణ\n• ☀️ సోలార్ శక్తి & బయోగ్యాస్\n• 🍄 పుట్టగొడుగులు & ఆఫ్-సీజన్ పంటలు\n• 📦 పంట తర్వాత నిల్వ\n• 🏛️ ప్రభుత్వ పథకాలు & సబ్సిడీలు\n• 💰 మార్కెట్ ధరలు & పంట అమ్మకం\n• 🌾 విత్తన బ్యాంకులు & కరువు నిర్వహణ\n\nమీ ప్రశ్న టైప్ చేయండి!',
    },
  },
  {
    regex: /thank|thanks|dhanyavad|shukriya|great|good|nice|helpful|ధన్యవాదాలు|धन्यवाद/i,
    answers: {
      en: 'You are welcome! 🙏 Happy farming! May your harvest be plentiful! 🌾',
      hi: 'धन्यवाद! 🙏 खुशहाल खेती करें! आपकी फसल भरपूर हो! 🌾',
      te: 'ధన్యవాదాలు! 🙏 సంతోషంగా వ్యవసాయం చేయండి! మీ పంట పుష్కలంగా పండాలి! 🌾',
    },
  },
];

const FALLBACK: Record<Lang, string> = {
  en: "I'm not sure about that yet. 🤔 Ask me about:\n• Drip irrigation, water harvesting\n• Vermicompost, soil health\n• Neem pesticide, organic farming\n• Solar pumps, biogas\n• Government schemes, MSP\n• Post-harvest storage, mushrooms",
  hi: 'मुझे इस बारे में अभी जानकारी नहीं है। 🤔 मुझसे पूछें:\n• ड्रिप सिंचाई, वर्षा जल संचयन\n• वर्मीकम्पोस्ट, मिट्टी की सेहत\n• नीम कीटनाशक, जैविक खेती\n• सौर पंप, बायोगैस\n• सरकारी योजनाएं, MSP\n• फसल भंडारण, मशरूम',
  te: 'నాకు దాని గురించి ఇంకా తెలియదు. 🤔 నన్ను అడగండి:\n• బిందు సేద్యం, వర్షపు నీటి సంరక్షణ\n• వర్మీ కంపోస్ట్, నేల ఆరోగ్యం\n• వేప పురుగుమందు, సేంద్రీయ వ్యవసాయం\n• సోలార్ పంపులు, బయోగ్యాస్\n• ప్రభుత్వ పథకాలు, MSP\n• పంట నిల్వ, పుట్టగొడుగులు',
};

function getBotReply(input: string, lang: Lang): string {
  const match = KB.find(({ regex }) => regex.test(input));
  return match ? match.answers[lang] : FALLBACK[lang];
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevLang = useRef<Lang>('en');

  // Initial welcome
  useEffect(() => {
    setMessages([{ id: 'welcome-en', role: 'bot', text: UI.en.welcome }]);
  }, []);

  // Re-welcome when language changes
  useEffect(() => {
    if (prevLang.current !== lang) {
      prevLang.current = lang;
      setMessages([{ id: `welcome-${lang}`, role: 'bot', text: UI[lang].welcome }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(trimmed, lang);
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: reply }]);
      setTyping(false);
    }, 700);
  };

  const LANG_LABELS: Record<Lang, string> = { en: 'EN', hi: 'हि', te: 'తె' };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="Open KisanBot"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] h-[540px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-none">KisanBot</p>
                <p className="text-green-200 text-xs mt-0.5 truncate">{UI[lang].subtitle}</p>
              </div>
              {/* Language toggle */}
              <div className="ml-auto flex items-center gap-1 bg-white/15 rounded-lg p-0.5">
                {(['en', 'hi', 'te'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${
                      lang === l ? 'bg-white text-green-800' : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'bot' ? 'bg-green-700' : 'bg-gray-300'}`}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${msg.role === 'bot' ? 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100' : 'bg-green-700 text-white rounded-br-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (first message only) */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex gap-2 overflow-x-auto flex-shrink-0 bg-gray-50 no-scrollbar">
                {SUGGESTIONS[lang].map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 text-xs bg-green-100 text-green-800 border border-green-200 rounded-full px-3 py-1.5 hover:bg-green-200 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-gray-100 bg-white flex items-center gap-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder={UI[lang].placeholder}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
