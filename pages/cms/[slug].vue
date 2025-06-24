<template>
  <div class="min-h-screen bg-white text-gray-900 py-10 px-4 sm:px-6 lg:px-12">
    <div class="max-w-7xl mx-auto space-y-12">

      <!-- CMS Page Found -->
      <div v-if="page?.title && page?.content">
        <!-- Page Title -->
       

        <!-- Page Content -->
        <div
          class="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl prose-red max-w-none mx-auto transition-all duration-300 hover:scale-[1.01]"
          v-html="page.content"
        />
      </div>

      <!-- 404 Page Not Found -->
      <div v-else class="text-center py-20 text-gray-600">
        <h2 class="text-2xl sm:text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
        <p class="text-base sm:text-lg">Oops! This CMS page doesn’t exist.</p>
        <NuxtLink
          to="/cms"
          class="mt-6 inline-block bg-black hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow transition"
        >
          🔙 Back to CMS Home
        </NuxtLink>
      </div>
      
    </div>
  </div>
</template>



<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const cmsPages = {
  'about': {
    title: 'About Us',
    content: `
    <section class="space-y-10">
      <!-- Hero Section -->
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-black">About <span class="text-red-600">ScootyLoot</span></h1>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Built for speed. Driven by heart. We’re not just delivering products — we’re redefining the way India moves.
        </p>
      </div>

      <!-- Our Story -->
      <div>
        <h2 class="text-2xl font-bold text-red-600 mb-2">📖 Our Story</h2>
        <p class="text-gray-700 leading-relaxed">
          The idea for ScootyLoot was sparked on a typical chaotic Delhi evening. Our founder was stuck in traffic,
          waiting endlessly for a food order that should have taken 10 minutes. That frustration turned into inspiration.
          <strong>Why couldn’t deliveries be as quick as a thought?</strong> And so, ScootyLoot was born — a fast, user-friendly, and
          community-driven platform dedicated to transforming last-mile delivery.
        </p>
        <p class="text-gray-700 mt-4">
          From humble beginnings with just 5 scooters and a rented storage space, we’ve grown into a dynamic delivery force
          operating across multiple Indian cities. Today, we empower thousands of users to order essentials, snacks, gadgets, and even last-minute gifts — and receive them within 30 minutes.
        </p>
      </div>

      <!-- Our Mission -->
      <div>
        <h2 class="text-2xl font-bold text-red-600 mb-2">🎯 Our Mission</h2>
        <p class="text-gray-700 leading-relaxed">
          We believe in <strong>“Saving Time, Spreading Smiles.”</strong> Time is the most valuable thing we all have, and ScootyLoot
          is on a mission to ensure you never waste another minute waiting. Our entire model — from technology and logistics
          to customer support — revolves around delivering joy in record time.
        </p>
        <ul class="list-disc list-inside mt-4 text-gray-700">
          <li>Delivering anything, anywhere, fast</li>
          <li>Keeping convenience affordable</li>
          <li>Supporting small businesses with last-mile solutions</li>
          <li>Building a reliable and green delivery ecosystem</li>
        </ul>
      </div>

      <!-- Our Vision -->
      <div>
        <h2 class="text-2xl font-bold text-red-600 mb-2">🔭 Our Vision</h2>
        <p class="text-gray-700 leading-relaxed">
          We envision a future where every Indian — from metropolitan cities to small towns — can access anything they need
          within 30 minutes. We want ScootyLoot to be <strong>India’s most trusted hyper-local delivery partner</strong>, enabling
          commerce, comfort, and connection — all at once.
        </p>
        <p class="text-gray-700 mt-2">
          Our future roadmap includes drone-based delivery trials, AI-powered order prediction, and 100% electric vehicle
          adoption by 2030.
        </p>
      </div>

      <!-- Core Values -->
      <div>
        <h2 class="text-2xl font-bold text-red-600 mb-2">💡 Our Core Values</h2>
        <ul class="space-y-2 text-gray-700">
          <li><strong>Speed:</strong> Every second matters. We optimize every step of the journey.</li>
          <li><strong>Transparency:</strong> What you see is what you get. No hidden charges or vague timelines.</li>
          <li><strong>Empathy:</strong> From customer service to riders — we lead with kindness and understanding.</li>
          <li><strong>Innovation:</strong> We solve real-life problems with smart, scalable solutions.</li>
        </ul>
      </div>

      <!-- Meet the Team -->
      <div>
        <h2 class="text-2xl font-bold text-red-600 mb-2">🤝 Meet Our Team</h2>
        <p class="text-gray-700">
          We are a diverse, passionate, and slightly caffeine-addicted group of designers, developers, delivery champs,
          and dreamers. Our people are our strength.
        </p>
        <ul class="list-disc list-inside mt-4 text-gray-700">
          <li>👨‍💻 <strong>Dev Squad:</strong> Writing bug-free code (mostly) and building magical user experiences</li>
          <li>🏍️ <strong>Delivery Legends:</strong> The real heroes flying through traffic so you don’t have to</li>
          <li>📞 <strong>Support Gurus:</strong> Solving issues faster than you can say “order delayed”</li>
          <li>🧠 <strong>Ops Ninjas:</strong> Keeping logistics smoother than butter naan</li>
        </ul>
      </div>

      <!-- Culture & Careers -->
      <div>
        <h2 class="text-2xl font-bold text-red-600 mb-2">🌱 Culture & Careers</h2>
        <p class="text-gray-700">
          At ScootyLoot, we believe in freedom, flexibility, and fun. Whether you’re remote or at our HQ, we foster a
          creative environment where ideas thrive and people grow. We encourage cross-functional collaborations, celebrate
          wins (big or small), and support everyone’s journey — professionally and personally.
        </p>
       
      </div>

      <!-- Final CTA -->
      <div class="text-center mt-10">
        <h2 class="text-2xl font-extrabold text-black mb-2">Be Part of the <span class="text-red-600">ScootyLoot</span> Movement</h2>
        <p class="text-gray-700">
          Whether you’re ordering from us, working with us, or cheering from the sidelines — you’re already a part of our journey.
          Thank you for believing in the loot.
        </p>
        <a
  href="/"
  class="mt-4 inline-block bg-red-600 hover:bg-black text-white font-semibold px-6 py-3 rounded-lg shadow transition"
>
  🚀 Start Looting Now
</a>
      </div>
    </section>
    `
  },
  'how-it-works': {
    title: 'How It Works',
    content: `
  <section class="space-y-12 max-w-7xl mx-auto px-4">
    <!-- Intro -->
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-black">How <span class="text-red-600">ScootyLoot</span> Works</h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Speed isn’t just a feature — it’s the heart of our system. Here's how we get your orders to your doorstep in under 30 minutes 🚀
      </p>
    </div>

    <!-- Step-by-step Process -->
    <div class="grid md:grid-cols-3 gap-8 text-gray-800">
      <div class="bg-white border hover:shadow-lg transition p-6 rounded-xl">
        <h2 class="text-xl font-semibold text-red-600 mb-2">1. You Place the Order</h2>
        <p>Hop on to our app or website, browse products, and add them to your cart. Whether it’s a packet of Maggi or your favorite shampoo, we’ve got it covered.</p>
      </div>
      <div class="bg-white border hover:shadow-lg transition p-6 rounded-xl">
        <h2 class="text-xl font-semibold text-red-600 mb-2">2. We Match with Nearest Hub</h2>
        <p>Our smart system instantly finds the nearest ScootyLoot hub that has your item in stock, ensuring the fastest dispatch time possible.</p>
      </div>
      <div class="bg-white border hover:shadow-lg transition p-6 rounded-xl">
        <h2 class="text-xl font-semibold text-red-600 mb-2">3. Rider Assigned Instantly</h2>
        <p>Within seconds, a ScootyLoot rider is assigned. Our routing tech chooses the fastest route and you get real-time tracking — every turn, every signal.</p>
      </div>
    </div>

    <!-- Live Tracking -->
    <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-red-600 mb-2">📍 Live Tracking = Peace of Mind</h2>
      <p class="text-gray-700">
        You’re never left wondering. Our dynamic live-tracking lets you follow your order from packing to pickup to doorstep — updated every few seconds.
      </p>
    </div>

    <!-- Behind-the-scenes -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-4">🔧 Behind the Scenes</h2>
      <p class="text-gray-700 leading-relaxed">
        Behind the magic is a network of dark stores, trained riders, AI-powered logistics, and seamless customer support — all coordinated to get your delivery right the first time.
      </p>
      <ul class="list-disc list-inside mt-4 text-gray-700">
        <li><strong>Micro Warehouses:</strong> Strategically placed to cover max pin codes</li>
        <li><strong>AI Dispatch Engine:</strong> Matches inventory and routes automatically</li>
        <li><strong>Green Fleet:</strong> Most of our vehicles are electric — because speed can be clean 🌱</li>
        <li><strong>Smart Inventory:</strong> Real-time sync means zero out-of-stock errors</li>
      </ul>
    </div>

    <!-- Who is this for -->
    <div class="grid md:grid-cols-3 gap-6">
      <div class="p-6 bg-white rounded-xl border hover:shadow-xl transition">
        <h3 class="text-lg font-bold text-red-600 mb-2">👨‍👩‍👧 Families</h3>
        <p class="text-gray-700">From baby diapers to chai patti — get everything you need without stepping out.</p>
      </div>
      <div class="p-6 bg-white rounded-xl border hover:shadow-xl transition">
        <h3 class="text-lg font-bold text-red-600 mb-2">👨‍🎓 Students</h3>
        <p class="text-gray-700">Missed breakfast or out of data? We deliver study snacks and tech accessories in minutes.</p>
      </div>
      <div class="p-6 bg-white rounded-xl border hover:shadow-xl transition">
        <h3 class="text-lg font-bold text-red-600 mb-2">🏢 Professionals</h3>
        <p class="text-gray-700">Busy with meetings? Schedule your delivery and stay on top of your work-life.</p>
      </div>
    </div>

    <!-- Why it works -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">⚡ Why ScootyLoot Works So Well</h2>
      <p class="text-gray-700 leading-relaxed">
        Our system is optimized for India’s pace. Unlike global models that take hours or days, ScootyLoot works with Indian realities — local needs, local routes, and local inventory.
      </p>
      <p class="text-gray-700 mt-2">
        We combine deep tech with deep empathy — delivering more than just items. We deliver trust.
      </p>
    </div>

    <!-- CTA -->
    <div class="text-center mt-12">
      <h2 class="text-3xl font-extrabold text-black mb-2">Get Started with <span class="text-red-600">ScootyLoot</span> Today</h2>
      <p class="text-gray-700">Because life’s too short to wait in line or sit in traffic. Just loot it. ⚡</p>
     <a
  href="/"
  class="mt-6 inline-block bg-black hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
>
  🔥 Order Now in 30 Minutes
</a>

    </div>
  </section>
  `
  },

  'support': {
    title: 'Support',
    content: `
  <section class="space-y-12 max-w-7xl mx-auto px-4">
    <!-- Hero -->
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-black">Need Help? <span class="text-red-600">ScootyLoot Support</span> is Here</h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Whether you’re facing an issue, have a suggestion, or just want to say hello — we’re here to listen and help you out in the fastest way possible. Real humans. Real support. Real quick.
      </p>
    </div>

    <!-- Contact Details -->
    <div class="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">
      <h2 class="text-2xl font-bold text-red-600 mb-4">📞 How to Reach Us</h2>
      <ul class="text-gray-700 space-y-3">
        <li>📧 <strong>Email:</strong> <a href="mailto:support@scootyloot.com" class="text-red-600 hover:underline">support@scootyloot.com</a></li>
        <li>📱 <strong>Phone:</strong> +91 98765 43210</li>
        <li>📍 <strong>Address:</strong> DLF Cyber City, Gurugram, Haryana</li>
        <li>🕒 <strong>Support Hours:</strong> 9:00 AM – 11:00 PM, Every Day</li>
      </ul>
      <p class="mt-4 text-sm text-gray-500">Please note: For fastest resolution, email or live chat is preferred.</p>
    </div>

    <!-- What We Help With -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">🛠️ Common Support Topics</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li>Order tracking and delivery status</li>
        <li>Refunds & replacements</li>
        <li>Account and login issues</li>
        <li>Promo code and wallet queries</li>
        <li>Payment failures or delays</li>
        <li>Suggestions, complaints, and general feedback</li>
      </ul>
    </div>

    <!-- Live Support -->
    <div class="p-6 bg-red-50 border-l-4 border-red-500 rounded shadow-sm">
      <h2 class="text-2xl font-bold text-red-600 mb-2">💬 Live Chat Support</h2>
      <p class="text-gray-700 leading-relaxed">
        Need an urgent update? Use our in-app live chat for real-time assistance. Our average response time is under 3 minutes.
      </p>
      <p class="text-gray-700 mt-2">
        You can find the chat option at the bottom right of your app screen. Just tap on "Chat with Us" — our team is ready.
      </p>
    </div>

    <!-- FAQ Section -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">❓ Frequently Asked Questions</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded border cursor-pointer">
          <summary class="font-semibold text-black">My order is delayed. What do I do?</summary>
          <p class="mt-2 text-gray-700">Check the live tracking first. If it's stuck, contact our chat support — they’ll resolve it instantly or issue compensation if needed.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded border cursor-pointer">
          <summary class="font-semibold text-black">Can I get a refund for a wrong item?</summary>
          <p class="mt-2 text-gray-700">Absolutely. We prioritize fairness. If something went wrong, just drop us a message — we’ll fix it or refund it, no questions asked.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded border cursor-pointer">
          <summary class="font-semibold text-black">My payment failed, but money was deducted.</summary>
          <p class="mt-2 text-gray-700">This is rare, but if it happens, the amount is auto-refunded by the bank within 5–7 business days. Meanwhile, share your payment ID with us for faster help.</p>
        </details>
      </div>
    </div>

    <!-- Feedback -->
    <div class="bg-white p-6 rounded-xl shadow border hover:shadow-xl transition">
      <h2 class="text-2xl font-bold text-red-600 mb-3">🗣️ We Love Feedback</h2>
      <p class="text-gray-700">
        Your ideas shape our future. Whether it’s about product suggestions, delivery experience, app glitches, or compliments for our riders — we want to hear it all.
      </p>
      <p class="mt-2 text-gray-700">
        Share your feedback with us anytime at <a href="mailto:feedback@scootyloot.com" class="text-red-600 hover:underline">feedback@scootyloot.com</a>
      </p>
    </div>

    <!-- Response Promise -->
    <div class="bg-black text-white rounded-xl p-6 text-center">
      <h2 class="text-2xl font-bold mb-2 text-white">⚡ Our Promise: <span class="text-red-500">Fast Resolutions</span></h2>
      <p>
        90% of issues are resolved in under 10 minutes. We’re committed to speed, even in support.
      </p>
      <p class="mt-1 text-sm text-gray-300">If it ever takes longer, you’ll get a voucher as a goodwill token. Because your time matters.</p>
    </div>

    <!-- Final CTA -->
    <div class="text-center mt-12">
      <h2 class="text-2xl font-extrabold text-black mb-2">Still Stuck?</h2>
      <p class="text-gray-700">Don’t worry. Just message us and let us make things right, fast.</p>
      
    </div>
  </section>
  `
  },
  'terms-of-service': {
    title: 'Terms of Service',
    content: `
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-10 text-gray-800">
    <!-- Page Title -->
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-black">📜 Terms of <span class="text-red-600">Service</span></h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        These Terms of Service ("Terms") govern your use of ScootyLoot’s services, website, and mobile application.
        Please read them carefully before using our platform. Your use of ScootyLoot signifies your agreement to be bound
        by these terms.
      </p>
    </div>

    <!-- Agreement Section -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">1. 📝 Acceptance of Terms</h2>
      <p class="leading-relaxed">
        By accessing or using ScootyLoot in any manner, including visiting or browsing the website or using our app,
        you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.
      </p>
      <p class="mt-2 text-gray-600 italic">
        These Terms constitute a legally binding agreement between you and ScootyLoot Technologies Pvt. Ltd.
      </p>
    </div>

    <!-- Description of Service -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">2. 📦 Description of Services</h2>
      <p class="leading-relaxed">
        ScootyLoot provides hyper-local last-mile delivery of goods such as groceries, daily essentials, electronics,
        and lifestyle products within select cities. Users may place orders through our app or website.
      </p>
      <ul class="list-disc list-inside mt-4 text-gray-700">
        <li>Deliveries are subject to stock availability at nearby partner stores.</li>
        <li>Delivery times may vary during high demand or unforeseen circumstances.</li>
        <li>We strive to maintain real-time inventory and transparent availability.</li>
      </ul>
    </div>

    <!-- Account Responsibilities -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">3. 👤 User Accounts</h2>
      <p>
        To use most features, you must register for an account. You are responsible for maintaining the confidentiality
        of your account and password and for restricting access to your device.
      </p>
      <p class="mt-2">
        You agree to:
      </p>
      <ul class="list-disc list-inside mt-2 text-gray-700">
        <li>Provide accurate, current, and complete information during registration</li>
        <li>Not impersonate another person or use someone else’s account</li>
        <li>Notify us of unauthorized access immediately</li>
      </ul>
    </div>

    <!-- Payments -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">4. 💳 Payments and Refunds</h2>
      <p>
        All transactions are processed securely through trusted gateways. Prices include taxes where applicable.
        Payments once made are subject to refund only as per our <a href="/cms/refund-policy" class="text-red-600 hover:underline">Refund Policy</a>.
      </p>
      <ul class="list-disc list-inside mt-4 text-gray-700">
        <li>We accept UPI, Cards, Wallets, and COD (subject to limits).</li>
        <li>Refunds for failed deliveries are processed within 5-7 business days.</li>
        <li>Wallet top-ups are non-refundable unless due to technical error.</li>
      </ul>
    </div>

    <!-- Restrictions -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">5. 🚫 Prohibited Activities</h2>
      <p>As a user of ScootyLoot, you agree not to:</p>
      <ul class="list-disc list-inside mt-2 text-gray-700">
        <li>Violate any laws, third-party rights, or our policies</li>
        <li>Interfere with our services, systems, or networks</li>
        <li>Use bots, scrapers, or other automated tools</li>
        <li>Attempt to harm our delivery partners or support staff</li>
      </ul>
      <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
        <strong>Note:</strong> Violations may result in account suspension or legal action.
      </div>
    </div>

    <!-- Intellectual Property -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">6. 🧠 Intellectual Property</h2>
      <p>
        All content on ScootyLoot including logos, UI designs, icons, text, and images are property of ScootyLoot.
        Unauthorized use or reproduction is strictly prohibited.
      </p>
    </div>

    <!-- Modifications -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">7. ✏️ Modifications to Terms</h2>
      <p>
        We may revise these Terms from time to time. Changes will be effective upon posting on our platform.
        Continued usage of our services implies acceptance of the revised Terms.
      </p>
      <p class="text-sm text-gray-500 mt-2">
        Last updated: June 23, 2025
      </p>
    </div>

    <!-- Termination -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">8. 🔐 Termination</h2>
      <p>
        ScootyLoot reserves the right to suspend or terminate your access at any time without prior notice if you violate
        our Terms or misuse the platform.
      </p>
      <p class="mt-2">
        On termination, your rights to use the services will cease immediately.
      </p>
    </div>

    <!-- Disputes -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">9. ⚖️ Governing Law & Disputes</h2>
      <p>
        These Terms shall be governed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction
        of Delhi courts only.
      </p>
    </div>

    <!-- Contact Info -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">10. 📬 Contact Information</h2>
      <p>If you have any questions or concerns regarding these Terms, please contact us:</p>
      <ul class="mt-3 text-gray-700">
        <li>📧 Email: <a href="mailto:legal@scootyloot.com" class="text-red-600 hover:underline">legal@scootyloot.com</a></li>
        <li>📞 Phone: +91 98765 43210</li>
        <li>🏢 Address: ScootyLoot HQ, DLF Cyber City, Gurugram, Haryana</li>
      </ul>
    </div>

    <!-- Final CTA -->
    <div class="text-center mt-12">
      <h2 class="text-3xl font-extrabold text-black">Your Trust. <span class="text-red-600">Our Responsibility.</span></h2>
      <p class="mt-2 text-gray-700">Thank you for choosing ScootyLoot. Your seamless delivery experience begins with mutual trust and transparency.</p>
      
    </div>
  </section>
  `
  }, 'privacy-policy': {
    title: 'Privacy Policy',
    content: `
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-10 text-gray-800">
    <!-- Page Title -->
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-black">🔐 Privacy <span class="text-red-600">Policy</span></h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Your privacy matters to us at ScootyLoot. This policy explains how we collect, use, disclose, and safeguard your information when you visit or use our platform.
      </p>
    </div>

    <!-- Introduction -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">1. 📘 Introduction</h2>
      <p>
        At ScootyLoot, we are committed to maintaining your trust. We want you to understand what data we collect, why we collect it, and how we use it — with full transparency and security in mind.
      </p>
    </div>

    <!-- Information We Collect -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">2. 📋 Information We Collect</h2>
      <p>We collect the following types of data:</p>
      <ul class="list-disc list-inside mt-3 text-gray-700">
        <li><strong>Personal Identifiable Information (PII):</strong> Name, phone number, address, email</li>
        <li><strong>Device Info:</strong> Device type, browser version, IP address</li>
        <li><strong>Location Data:</strong> For real-time delivery and order accuracy</li>
        <li><strong>Payment Details:</strong> Only securely tokenized, never stored in raw form</li>
        <li><strong>Order & App Usage History:</strong> To improve personalization</li>
      </ul>
    </div>

    <!-- How We Use It -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">3. 🛠️ How We Use Your Data</h2>
      <p>Your data helps us serve you better. Here's how:</p>
      <ul class="list-disc list-inside mt-3 text-gray-700">
        <li>🚚 Fulfilling and delivering orders promptly</li>
        <li>🛡️ Fraud detection and user authentication</li>
        <li>📈 Analyzing usage patterns to improve user experience</li>
        <li>🎯 Sending targeted promotions or offers (you can opt out anytime)</li>
        <li>🤝 Assisting customer support for faster issue resolution</li>
      </ul>
    </div>

    <!-- Cookies -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">4. 🍪 Cookies & Tracking</h2>
      <p>
        Cookies are small data files stored on your browser. They help us remember user preferences and improve your browsing experience.
      </p>
      <ul class="list-disc list-inside mt-3 text-gray-700">
        <li><strong>Session Cookies:</strong> Expire when you close the browser</li>
        <li><strong>Persistent Cookies:</strong> Stay to remember preferences</li>
        <li><strong>Analytics Cookies:</strong> Help us understand site traffic</li>
      </ul>
      <p class="mt-2">
        You can control or delete cookies through your browser settings. However, some features of our service may not function optimally without them.
      </p>
    </div>

    <!-- Data Sharing -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">5. 🔄 Sharing Your Data</h2>
      <p>
        We do <strong>not</strong> sell your personal data. We may share information only in the following situations:
      </p>
      <ul class="list-disc list-inside mt-3 text-gray-700">
        <li>📦 With delivery partners strictly for order completion</li>
        <li>🛡️ With regulatory authorities when required by law</li>
        <li>🔧 With service providers for payment or analytics — under strict confidentiality agreements</li>
      </ul>
    </div>

    <!-- Data Protection -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">6. 🔐 Data Security</h2>
      <p>
        Your security is our responsibility. We implement:
      </p>
      <ul class="list-disc list-inside mt-3 text-gray-700">
        <li>SSL encryption for all data transfers</li>
        <li>Regular vulnerability scans and audits</li>
        <li>Tokenized payment handling (we never store raw card details)</li>
        <li>Role-based access and encrypted user databases</li>
      </ul>
      <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
        <strong>Note:</strong> While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
      </div>
    </div>

    <!-- User Rights -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">7. 🧾 Your Rights</h2>
      <p>You have the right to:</p>
      <ul class="list-disc list-inside mt-3 text-gray-700">
        <li>Request access to your personal data</li>
        <li>Request correction or deletion of your data</li>
        <li>Opt out of marketing communications anytime</li>
        <li>Withdraw consent for data collection (with limited functionality)</li>
      </ul>
    </div>

    <!-- Children's Privacy -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">8. 🧒 Children’s Privacy</h2>
      <p>
        ScootyLoot does not knowingly collect personal information from children under 13. If we learn we have collected
        such data, we will take steps to delete it.
      </p>
    </div>

    <!-- Updates to Policy -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">9. 🕒 Policy Updates</h2>
      <p>
        This privacy policy may be updated periodically. Changes will be posted on this page, and major updates will be communicated via email or in-app notification.
      </p>
      <p class="text-sm text-gray-500 mt-2">
        Last updated: June 23, 2025
      </p>
    </div>

    <!-- Contact -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">10. 📮 Contact Us</h2>
      <p>If you have any questions or requests about our privacy practices:</p>
      <ul class="mt-3 text-gray-700">
        <li>📧 Email: <a href="mailto:privacy@scootyloot.com" class="text-red-600 hover:underline">privacy@scootyloot.com</a></li>
        <li>📞 Phone: +91 98765 43210</li>
        <li>🏢 Address: DLF Cyber City, Gurugram, Haryana</li>
      </ul>
    </div>

    <!-- Final CTA -->
    <div class="text-center mt-12">
      <h2 class="text-3xl font-extrabold text-black">Your Data, <span class="text-red-600">Your Rights.</span></h2>
      <p class="mt-2 text-gray-700">We promise to keep your data safe and respect your privacy every step of the way.</p>
     
    </div>
  </section>
  `
  },

  'accessibility': {
    title: 'Accessibility',
    content: `
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-10 text-gray-800">
    <!-- Hero Section -->
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-black">♿ Accessibility at <span class="text-red-600">ScootyLoot</span></h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Inclusivity isn’t an afterthought at ScootyLoot — it’s a fundamental part of how we operate. We are deeply committed to ensuring that everyone, regardless of ability, can access and use our services effectively.
      </p>
    </div>

    <!-- Our Commitment -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">1. 🎯 Our Commitment to Inclusivity</h2>
      <p class="leading-relaxed">
        Accessibility is more than just a checklist — it’s our pledge to make sure technology doesn’t leave anyone behind. We aim to provide an inclusive, intuitive, and seamless experience for users with varying physical, cognitive, and sensory abilities.
      </p>
      <p class="mt-2">
        We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, along with usability research, user testing, and real-world feedback to ensure we’re continually improving.
      </p>
    </div>

    <!-- Key Features Implemented -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">2. 🛠️ Accessibility Features</h2>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Screen Reader Compatibility:</strong> All pages are structured semantically for ease of navigation with screen readers.</li>
        <li><strong>Keyboard Navigation:</strong> Full access to site functionality using only a keyboard (tab, enter, arrows).</li>
        <li><strong>ARIA Roles & Labels:</strong> We utilize ARIA attributes to improve experience for assistive technologies.</li>
        <li><strong>High-Contrast Design:</strong> Readable, color-safe UI elements designed for visual comfort.</li>
        <li><strong>Alt Text:</strong> All images and icons include descriptive alternative text.</li>
        <li><strong>Form Labels:</strong> Proper form labels and focus states are applied to input fields.</li>
        <li><strong>Accessible Modals & Dialogs:</strong> Fully keyboard-controllable and screen reader compatible.</li>
        <li><strong>Responsive Typography:</strong> Dynamic text scaling ensures readability on all devices.</li>
      </ul>
    </div>

    <!-- How We Test -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">3. 🧪 Accessibility Testing</h2>
      <p class="leading-relaxed">
        We perform rigorous manual and automated accessibility audits using tools like:
      </p>
      <ul class="list-disc list-inside mt-2 text-gray-700">
        <li>Lighthouse Accessibility Scanner</li>
        <li>axe DevTools by Deque</li>
        <li>NVDA and VoiceOver screen reader testing</li>
        <li>Keyboard-only navigation simulation</li>
      </ul>
      <p class="mt-4">
        In addition, we work with users who have real-world accessibility needs and gather feedback to iterate continuously.
      </p>
    </div>

    <!-- Who Benefits -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">4. 🌏 Who Benefits from Accessibility?</h2>
      <p class="leading-relaxed">
        Accessibility helps everyone — not just people with disabilities. It benefits:
      </p>
      <ul class="list-disc list-inside mt-2 text-gray-700">
        <li>People with temporary injuries or illnesses</li>
        <li>Older adults facing age-related challenges</li>
        <li>Mobile users on smaller screens</li>
        <li>Users with slow internet or older hardware</li>
        <li>Multi-tasking users who rely on voice or keyboard input</li>
      </ul>
      <p class="mt-2">By building accessibly, we build better — for all.</p>
    </div>

    <!-- Future Goals -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">5. 🔭 Our Future Goals</h2>
      <p class="text-gray-700 leading-relaxed">
        We’re not done. Accessibility is an ongoing effort. Our roadmap includes:
      </p>
      <ul class="list-disc list-inside mt-2 text-gray-700">
        <li>Voice Command Features for Hands-Free Ordering</li>
        <li>AI-driven personalization for neurodiverse users</li>
        <li>Real-time accessibility audits in our CI/CD pipeline</li>
        <li>Monthly community testing with users with disabilities</li>
      </ul>
    </div>

    <!-- Feedback & Support -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">6. 📮 Feedback & Support</h2>
      <p class="text-gray-700 leading-relaxed">
        Accessibility is a partnership. If you face any issues or have suggestions for improvement, please reach out to us.
      </p>
      <ul class="mt-3 text-gray-700">
        <li>📧 Email: <a href="mailto:access@scootyloot.com" class="text-red-600 hover:underline">access@scootyloot.com</a></li>
        <li>📞 Phone: +91 98765 43210</li>
        <li>🏢 Address: ScootyLoot HQ, DLF Cyber City, Gurugram, Haryana</li>
      </ul>
    </div>

    <!-- Final CTA -->
    <div class="text-center mt-12">
      <h2 class="text-3xl font-extrabold text-black mb-2">Let’s Build a <span class="text-red-600">More Accessible</span> World</h2>
      <p class="text-gray-700">Because true convenience is only real when it includes everyone.</p>
    </div>
  </section>
  `
  }
}

const page = cmsPages[slug]
</script>
