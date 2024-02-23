# Requirement Level Database

✅ Schema Table (ERD)
**Terdapat entitas/table wajib yaitu users dengan attribute yang harus ada:**
✅ email
✅ password
role
**Memiliki 3 jenis asosiasi yang berbeda:**
✅ One to One 
✅ One to Many
✅ Many to Many (belongsToMany)
✅ Membuat model & migration
✅ Membuat migration tambahan (add column, rename column, remove column, add constraint, dsb)
✅ Membuat seeder (minimal 1)

------
# Requirement Routes

✅ Minimal terdapat 2 route GET dan 1 route POST
✅ Terdapat route untuk logout

------
# Requirement Aplikasi

✅ Terdapat fitur search atau sort (menggunakan OP dari sequelize)
✅ Terdapat static method dan (instance method atau getter) di model
✅ Menggunakan berbagai macam validasi dari sequelize dan mengolahnya sehingga tampil pada page (lebih dari 1 jenis validasi, notEmpty dan  notNull dihitung 1 validasi)
Menggunakan method-method sequelize yang bertujuan untuk CRUD
✅ Terdapat hooks
✅ Membuat dan menggunakan helper
✅ Menggunakan mekanisme promise chaining (notifikasi delete kaya challenge 6)

------
# Requirement Pages

**Landing page (menggambarkan project)**
✅ Register & login page
✅ Memiliki 1 page yang menampilkan data gabungan dari 2 table atau lebih (gunakan eager loading dari sequelize)

------
# Requirement Explore

✅ Membuat sistem login dengan middleware, session & bcryptjs
Membuat fitur MVP(Minimal Valuable Package) (fitur unik dengan menggunakan package yang belum pernah dibahas saat lecture)

------
# Tema Pair project

Berikut adalah list entitas/tabel sesuai dengan tema terkait. Kamu boleh menambahkan table maupun field lainnya bila memang dibutuhkan. Setiap tema harus mengandung minimal  masing-masing 1 asosiasi (1 to 1, 1 to M, and M to M).

Entitas/Table User pasti dimiliki oleh setiap tema. List field user:

**User**
✅ id
✅ username:string (optional)
✅ email:string  (validation: required, uniq, email format)
✅ password:string  (validation: required, length min 8)
✅ role:string
