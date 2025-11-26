// Test script to verify navigation menu structure
import { publicPagesService } from './src/services/publicPagesService.js';

async function testNavigation() {
  try {
    console.log('Fetching navigation menu...');
    const menu = await publicPagesService.getNavigationMenu();
    console.log('Navigation menu:', JSON.stringify(menu, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testNavigation();
