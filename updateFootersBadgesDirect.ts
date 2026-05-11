import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const premiumBadges = `                <!-- Trust Badges -->
                <div class="mt-8 flex flex-wrap items-center gap-4">
                    <div class="flex flex-col gap-1 items-center bg-white/5 border border-white/10 rounded-lg py-2 px-3 hover:bg-white/10 transition-colors shadow-lg hover:shadow-accent-gold/10">
                        <div class="text-accent-gold text-[10px] tracking-widest font-black flex gap-[2px]">
                            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <span class="text-[9px] font-bold uppercase tracking-widest text-white/90">Top Rated</span>
                    </div>
                    <div class="flex flex-col gap-1 items-center bg-white/5 border border-white/10 rounded-lg py-2 px-3 hover:bg-white/10 transition-colors shadow-lg hover:shadow-accent-green/10">
                        <div class="text-accent-green text-[10px] flex items-center">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span class="text-[9px] font-bold uppercase tracking-widest text-white/90">Eco-Certified</span>
                    </div>
                    <div class="flex flex-col gap-1 items-center bg-white/5 border border-white/10 rounded-lg py-2 px-3 hover:bg-white/10 transition-colors shadow-lg hover:shadow-[#ca4848]/10">
                        <div class="text-[#ca4848] text-[10px]">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        </div>
                        <span class="text-[9px] font-bold uppercase tracking-widest text-white/90">Local Team</span>
                    </div>
                </div>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Quick and dirty replacement covering any previous <!-- Trust Badges --> ... </div> pattern
    content = content.replace(/<!-- Trust Badges -->[\s\S]*?<\/div>/g, premiumBadges);
    
    fs.writeFileSync(file, content);
}
