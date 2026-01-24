/**
 * 產品資料
 * 實際專案應從資料庫取得
 */
const products = [
    {
        id: 1,
        name: 'Apple iPhone 15 Pro Max 256GB',
        category: '3C 科技',
        price: 48900,
        originalPrice: 52900,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
        isHot: true,
        isNew: true,
        discount: 92,
        reviews: 1234,
        description: '鈦金屬設計，A17 Pro 晶片'
    },
    {
        id: 2,
        name: 'Sony WH-1000XM5 無線降噪耳機',
        category: '3C 科技',
        price: 10900,
        originalPrice: 12900,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        isHot: true,
        isNew: false,
        discount: 84,
        reviews: 856,
        description: '業界最佳降噪，30 小時續航'
    },
    {
        id: 3,
        name: 'LANEIGE 水感亮采精華',
        category: '美妝保養',
        price: 1280,
        originalPrice: 1580,
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
        isHot: false,
        isNew: true,
        discount: 81,
        reviews: 567,
        description: '保濕精華，打造水潤肌膚'
    },
    {
        id: 4,
        name: 'Nintendo Switch OLED 版',
        category: '遊戲娛樂',
        price: 10480,
        originalPrice: 11480,
        image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop',
        isHot: true,
        isNew: false,
        discount: 91,
        reviews: 432,
        description: '7 吋 OLED 螢幕，暢玩遊戲'
    },
    {
        id: 5,
        name: 'Dyson V15 Detect 無線吸塵器',
        category: '居家生活',
        price: 24900,
        originalPrice: 28900,
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop',
        isHot: true,
        isNew: false,
        discount: 86,
        reviews: 678,
        description: '雷射偵測微塵，智慧深層清潔'
    },
    {
        id: 6,
        name: 'UNIQLO 高級輕羽絨外套',
        category: '流行服飾',
        price: 1990,
        originalPrice: 2490,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
        isHot: false,
        isNew: true,
        discount: 80,
        reviews: 289,
        description: '輕量保暖，可收納設計'
    },
    {
        id: 7,
        name: 'Philips 飛利浦氣炸鍋 XXL',
        category: '居家生活',
        price: 8990,
        originalPrice: 10990,
        image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=400&fit=crop',
        isHot: true,
        isNew: false,
        discount: 82,
        reviews: 445,
        description: '7L 大容量，少油健康料理'
    },
    {
        id: 8,
        name: 'Apple AirPods Pro 2',
        category: '3C 科技',
        price: 7490,
        originalPrice: 7990,
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
        isHot: true,
        isNew: true,
        discount: 94,
        reviews: 334,
        description: 'H2 晶片，主動式降噪 2.0'
    },
    {
        id: 10,
        name: '⚡️ 實際測試商品 - 金流 100 元',
        category: '3C 科技',
        price: 100,
        originalPrice: 999,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
        isHot: true,
        isNew: true,
        discount: 10,
        reviews: 99,
        description: '實際測試金流用，金額為 100 元'
    }
];

module.exports = products;
