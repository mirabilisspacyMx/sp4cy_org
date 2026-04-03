// dbService.js
// Archivo de conexión y configuración para el Servidor Dedicado / VPS (sp4cy.shop)

const BASE_URL = 'http://www.sp4cy.shop/api';
// Nota: Ajustar el protocolo a 'http' si el VPS aún no cuenta con certificado SSL,
// o incluir el puerto (ej. https://sp4cy.shop:3000/api) según la configuración del servidor backend.

export const dbService = {
  /**
   * Registra un nuevo usuario en la base de datos de sp4cy.shop
   * @param {Object} userData - Datos de usuario desde el formulario
   */
  async registerUser(userData) {
    try {
      // Mapeo de datos para asegurar compatibilidad con la DB
      const payload = {
        firstName: userData.nombre,
        lastName: userData.apellido,
        age: parseInt(userData.edad),
        phone: userData.telefono,
        username: `${userData.usuario}@sp4cy.com`, // Se formatea el usuario con el subdominio
        rank: userData.rango,                     // Empleo o Rango en el sistema
        password: userData.password
      };

      console.log('Iniciando conexión con DB en sp4cy.shop...', payload);

      // Descomentar el bloque fetch cuando el backend en la VPS esté levantado y escuchando
      /*
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario en la base de datos principal');
      }

      const data = await response.json();
      return { success: true, data };
      */

      // Simulación de respuesta exitosa por latencia de red para demostración (Remover al conectar el backend)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: `Usuario ${payload.username} registrado exitosamente con rango ${payload.rank} en sp4cy.shop` });
        }, 1500);
      });

    } catch (error) {
      console.error('Error de conexión con la DB:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Inicia sesión verificando en sp4cy.shop
   */
  async loginUser(username, password) {
    try {
      console.log('Consultando credenciales en sp4cy.shop para:', username);
      // Lógica de Fetch al backend
      return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Autenticado' }), 1000));
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
