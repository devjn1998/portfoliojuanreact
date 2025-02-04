import React from 'react';
import htmlIcon from '../../../assets/img/icons/icon-html.png';
import cssIcon from '../../../assets/img/icons/icon-css.png';
import javascriptIcon from '../../../assets/img/icons/icon-javascript.png';
import vueIcon from '../../../assets/img/icons/icon-vue.png';
import reactIcon from '../../../assets/img/icons/icon-react.png';
import bootstrapIcon from '../../../assets/img/icons/icon-bootstrap.png';
import sassIcon from '../../../assets/img/icons/icon-sass.png';
import gulpIcon from '../../../assets/img/icons/icon-gulp.png';
import javaIcon from '../../../assets/img/icons/icon-java.png';
import springIcon from '../../../assets/img/icons/icon-spring.png';
import laravelIcon from '../../../assets/img/icons/icon-laravel.png';

const Skills: React.FC = () => {
  const skills = [
    { name: 'HTML5', icon: htmlIcon },
    { name: 'CSS3', icon: cssIcon },
    { name: 'JavaScript', icon: javascriptIcon },
    { name: 'VueJS', icon: vueIcon },
    { name: 'ReactJS', icon: reactIcon },
    { name: 'Bootstrap', icon: bootstrapIcon },
    { name: 'Sass', icon: sassIcon },
    { name: 'Gulp', icon: gulpIcon },
    { name: 'Java', icon: javaIcon },
    { name: 'Spring', icon: springIcon },
    { name: 'Laravel', icon: laravelIcon }
  ];

  return (
    <section id="skills" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-white font-bold text-center mb-8" data-aos="fade-down">
          Habilidades
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" data-aos="fade-up">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-[#212121] p-4 rounded-lg flex flex-col items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300 relative group"
            >
              <p className="text-[#0d6eed] text-sm md:text-base font-medium">
                {skill.name}
              </p>
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-10 md:w-12 h-auto"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d6eed] to-[#2f3ec7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
