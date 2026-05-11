import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const trustBadgesStr = `
                <!-- Trust Badges -->
                <div class="flex flex-wrap items-center gap-4 mb-4">
                    <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2 px-3 hover:bg-white/10 transition-colors">
                        <div class="flex text-accent-gold text-sm">
                            ★<span class="opacity-90">★</span><span class="opacity-80">★</span><span class="opacity-70">★</span><span class="opacity-60">★</span>
                        </div>
                        <span class="text-xs font-bold uppercase tracking-wider text-white">4.8/5 on Google</span>
                    </div>
                    <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2 px-3 hover:bg-white/10 transition-colors">
                        <div class="text-accent-green text-sm font-bold">
                            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span class="text-xs font-bold uppercase tracking-wider text-white">100% Eco-Friendly</span>
                    </div>
                    <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2 px-3 hover:bg-white/10 transition-colors">
                        <div class="text-[#ca4848] text-sm font-bold">
                            ♥
                        </div>
                        <span class="text-xs font-bold uppercase tracking-wider text-white">Local Guides</span>
                    </div>
                </div>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add trust badges before the social links in footer
    if (!content.includes('<!-- Trust Badges -->')) {
        content = content.replace(/<!-- Social Links -->/, trustBadgesStr + '\n                <!-- Social Links -->');
        fs.writeFileSync(file, content);
        console.log("Updated footer in", file);
    }
}
