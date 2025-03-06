'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function CuatroPorMilPage() {
  const [baseImponible, setBaseImponible] = useState('');
  const [resultado, setResultado] = useState({
    valorImpuesto: 0,
    baseGravable: 0
  });

  const calcularCuatroPorMil = () => {
    // Eliminar caracteres no numéricos y convertir a número
    const valorBase = parseFloat(baseImponible.replace(/[^0-9-]+/g,"")) || 0;

    // Calcular el impuesto
    const valorImpuesto = (valorBase * (4 / 1000));

    setResultado({
      valorImpuesto: valorImpuesto,
      baseGravable: valorBase
    });
  };

  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numero);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Eliminar caracteres no numéricos
    const valor = e.target.value.replace(/[^0-9]/g, '');
    
    // Formatear con separadores de miles
    const valorFormateado = new Intl.NumberFormat('es-CO').format(parseFloat(valor) || 0);
    
    setBaseImponible(valorFormateado);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Calculadora 4 x 1000
      </h1>

      <div className="mb-4">
        <label 
          htmlFor="baseImponible" 
          className="block mb-2 dark:text-gray-200"
        >
          Valor de la transacción
        </label>
        <input 
          type="text" 
          id="baseImponible"
          value={baseImponible}
          onChange={handleInputChange}
          placeholder="Ingrese el valor base"
          className="
            w-full 
            p-2 
            border 
            rounded 
            dark:bg-gray-700 
            dark:border-gray-600 
            dark:text-white
          "
        />
      </div>

      <Button 
        onClick={calcularCuatroPorMil}
        className="
          w-full 
          bg-blue-500 
          text-white 
          p-2 
          rounded 
          hover:bg-blue-600 
          transition
          dark:bg-blue-700
          dark:hover:bg-blue-600
        "
      >
        Calcular
      </Button>

      {resultado.baseGravable > 0 && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">
            Resultados
          </h2>
          <p className="dark:text-gray-200">
            Base Gravable: {formatearNumero(resultado.baseGravable)}
          </p>
          <p className="dark:text-gray-200">
            Valor 4 x 1000: {formatearNumero(resultado.valorImpuesto)}
          </p>
        </div>
      )}
    </div>
  );
}