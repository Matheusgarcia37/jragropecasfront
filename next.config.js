/** @type {import('next').NextConfig} */
module.exports = {
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/comoComprar': { page: '/comoComprar' },
      '/contato': { page: '/contato' },
      '/loginAdmin': { page: '/loginAdmin' },
      '/produtos': { page: '/produtos' },
      '/sobre': { page: '/sobre' },
      '/visualizarProduto': { page: '/visualizarProduto' },
      '/admin/produtos': { page: '/admin/produtos' },
      '/admin/produtos/novo': { page: '/admin/produtos/novo' },
      '/admin/produtos/editar': { page: '/admin/produtos/editar' },
      '/admin/usuarios': { page: '/admin/usuarios' },
      '/admin/usuarios/novo': { page: '/admin/usuarios/novo' },
      '/admin/usuarios/editar': { page: '/admin/usuarios/editar' },
    }
  },
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: ['via.placeholder.com', 'localhost', 'jragropecasupload.s3.sa-east-1.amazonaws.com', 'www.mgapecasagricolas.com.br', 'image.made-in-china.com', 'sc04.alicdn.com'],
  },
}
