const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/text-white/g, 'text-text-heading')
    .replace(/border-white\/10/g, 'border-black/10 dark:border-white/10')
    .replace(/border-white\/5/g, 'border-black/5 dark:border-white/5')
    .replace(/border-white\/30/g, 'border-black/20 dark:border-white/30')
    .replace(/bg-white\/5/g, 'bg-black/5 dark:bg-white/5')
    .replace(/hover:text-white/g, 'hover:text-text-heading');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
});
