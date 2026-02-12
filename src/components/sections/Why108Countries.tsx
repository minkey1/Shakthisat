import { motion } from 'framer-motion';
import { Globe as Globe2, Zap, Users as Users2 } from 'lucide-react';

const Why108Countries = () => {
  return (
    <section className='min-h-screen py-20 px-4 md:px-8' id='why-108'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Globe Animation Space */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='hidden lg:flex items-center justify-center h-screen'
          >
            {/* Empty space for globe animation */}
          </motion.div>

          {/* Content Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            {/* Title Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='bg-gradient-to-br from-purple-900/40 to-teal-900/40 rounded-2xl p-8 border border-purple-500/30'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text'>
                WHY 108 COUNTRIES?
              </h2>
            </motion.div>

            {/* Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='bg-gradient-to-br from-purple-900/40 to-teal-900/40 rounded-2xl p-8 border border-purple-500/20 text-center'
            >
              <div className='w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-teal-400 flex items-center justify-center relative overflow-hidden'>
                <span className='text-4xl font-bold text-white z-10'>108</span>
              </div>
              <p className='text-base md:text-lg text-white/90'>
                In the precision world of space engineering, the ~108 ratio is a cosmic alignment masterstroke — both the Moon and the Sun sit roughly 108 times their own diameters away from Earth, giving them an almost identical apparent size in our sky.

              </p>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className='bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl p-6 border border-purple-400/20'
            >
              <p className='text-base md:text-lg font-semibold text-transparent bg-gradient-to-r from-purple-300 to-teal-300 bg-clip-text'>
                In space science, ~108 appears as an approximate angular-geometry coincidence: the Moon and the Sun are each ~108–110 times their own diameters away from Earth, which makes their apparent angular sizes nearly equal (~0.5°).

This geometric near-match enables total solar eclipses and informs angular-resolution calculations, sensor field-of-view design, and alignment modeling in observational space systems.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className='grid grid-cols-1 gap-4'>
              {[
                { icon: Globe2, title: 'Cosmic Harmony', desc: 'Cultural significance' },
                { icon: Zap, title: 'Innovation Through Diversity', desc: 'Unique perspectives' },
                { icon: Users2, title: 'Global Collaboration', desc: 'Learning together' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-black/60 rounded-xl p-4 border border-purple-500/20 flex items-center space-x-3 hover:border-purple-500/40 transition-all group'
                >
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform'>
                    <item.icon className='w-5 h-5 text-white' />
                  </div>
                  <div className='min-w-0'>
                    <h4 className='text-white font-semibold text-sm md:text-base'>{item.title}</h4>
                    <p className='text-purple-200 text-xs md:text-sm'>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Why108Countries;
