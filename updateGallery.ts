import fs from 'fs';

let content = fs.readFileSync('gallery.html', 'utf8');

const newImages = `
            <!-- 17 -->
            <div class="gallery-item rounded-xl overflow-hidden shadow-lg border border-border group relative cursor-pointer" data-category="canal-rides landmarks">
                <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-8-2025-07-10-18-48-32-1024x683-2.webp" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" alt="Sunny day over Amsterdam canal with historical bridges and lush green trees." title="Beautiful Amsterdam Canal on a Sunny Day">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span class="text-text-primary text-4xl drop-shadow-lg">🔍</span>
                </div>
            </div>
            <!-- 18 -->
            <div class="gallery-item rounded-xl overflow-hidden shadow-lg border border-border group relative cursor-pointer" data-category="city-tours">
                <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-1-2025-07-11-23-45-12.webp" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" alt="Beautiful old Amsterdam street corner with bicycles parked alongside the gracht." title="Classic Amsterdam Street Corner with Bikes">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span class="text-text-primary text-4xl drop-shadow-lg">🔍</span>
                </div>
            </div>
            <!-- 19 -->
            <div class="gallery-item rounded-xl overflow-hidden shadow-lg border border-border group relative cursor-pointer" data-category="night romantic">
                <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-4-2025-07-10-18-46-20-1024x682.webp" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" alt="Evening view in Amsterdam with glowing streetlights reflecting on the canal waters." title="Romantic Evening Canal Reflections">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span class="text-text-primary text-4xl drop-shadow-lg">🔍</span>
                </div>
            </div>
            <!-- 20 -->
            <div class="gallery-item rounded-xl overflow-hidden shadow-lg border border-border group relative cursor-pointer" data-category="group">
                <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_5_2025-07-10_18-48-32-1024x682-1.webp" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" alt="Group of friends smiling in an Amsterdam rickshaw enjoying their city tour." title="Friends Enjoying an Amsterdam Rickshaw Tour">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span class="text-text-primary text-4xl drop-shadow-lg">🔍</span>
                </div>
            </div>`;

content = content.replace(/(<!-- 16 -->[\s\S]*?<\/div>)/, `$1${newImages}`);

fs.writeFileSync('gallery.html', content);
